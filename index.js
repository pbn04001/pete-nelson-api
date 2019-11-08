import express from 'express';
const uuidv4 = require('uuid/v4');
import serverless from 'serverless-http';
import graphiql from 'graphql-playground-middleware-express';
import { ApolloServer, gql } from 'apollo-server-express';
import {jobs, skills, providers, skillTypes} from './data';
import schema from './schema'

const AWS = require('aws-sdk');

const dynamoDbTableName = 'providerPricingTable'
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const dynamoDbTableParams = {
    TableName: dynamoDbTableName,
};

const typeDefs = gql`${schema}`;

const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const resolvers = {
    Query: {
        skills: (obj, args) => {
            if (args.type) {
                return skills.filter(skill => skill.type === args.type)
            }
            return skills
        },
        jobs: (obj, args) => {
            if (args.state) {
                return jobs.filter(job => job.location.state === args.state)
            }
            return jobs
        },
        providers: () => {
            const uuid = uuidv4()
            providers.forEach(provider => {
                setTimeout(() => {
                    const expire = new Date(new Date().getTime() * 60).getTime()
                    dynamoDb.put({
                        ...dynamoDbTableParams,
                        Item: {
                            PriceUUID: uuid,
                            ProviderId: provider.id,
                            Price: randomIntFromInterval(30, 100),
                            TimeToLive: expire
                        }
                    }, (error, result) => {
                        if (error) {
                            console.error(error);
                            return
                        }
                        console.log('Prices added', result)
                    })
                }, randomIntFromInterval(1000, 10000))
            })
            return {
                providers,
                uuid
            }
        },
        providerPrices: (obj, args) => {
            return new Promise((resolve) => {
                dynamoDb.query({
                    ...dynamoDbTableParams,
                    KeyConditionExpression: "PriceUUID = :PriceUUID",
                    ExpressionAttributeValues: {
                        ":PriceUUID": args.uuid
                    }
                }, (error, result) => {
                    if (error) {
                        console.log(error)
                        resolve([])
                        return
                    }

                    dynamoDb.batchWrite({
                       RequestItems: {
                           [dynamoDbTableName]: result.Items.map(item => {
                               return {
                                   DeleteRequest: {
                                       Key: {
                                           PriceUUID: item.PriceUUID,
                                           ProviderId: item.ProviderId
                                       }
                                   }
                               }
                           })
                       }
                    }, (error, result) => {
                        if (error) {
                            console.log(error)
                            return
                        }
                        console.log('Items deleted', result)
                    })

                    resolve(result.Items.map(item => ({
                        id: item.ProviderId,
                        price: item.Price
                    })))
                })
            })
        }
    }
};

const app = express();
const index = new ApolloServer({
    typeDefs,
    resolvers,
    path: '/graphql'
});
index.applyMiddleware({ app });
app.get('/playground', graphiql({ endpoint: `${!process.env.IS_OFFLINE ? '/dev' : ''}/graphql` }));
const handler = serverless(app);
export { handler };
