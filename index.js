import express from 'express';
const uuidv4 = require('uuid/v4');
import serverless from 'serverless-http';
import graphiql from 'graphql-playground-middleware-express';
import { ApolloServer, gql } from 'apollo-server-express';
import {jobs, skills, providers, skillTypes} from './data';

const AWS = require('aws-sdk');

const dynamoDbTableName = 'providerPricingTable'
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const dynamoDbTableParams = {
    TableName: dynamoDbTableName,
};

const typeDefs = gql`
  enum SkillType {
    ${skillTypes.LANGUAGE}
    ${skillTypes.UI_FRAMEWORK}
    ${skillTypes.UI}
    ${skillTypes.SERVER}
    ${skillTypes.DESIGN}
    ${skillTypes.DATABASE}
    ${skillTypes.TESTING}
  }
  
  enum State {
    AR
    CO
  }
  
  type Skill {
    type: SkillType!
    name: String!
    description: String
  }
  
  type Location {
    city: String!
    state: State!
  }
  
  type Date {
    month: String
    year: String
  }
  
  type DateRange {
    from: Date,
    to: Date
  }
  
  type Job {
    title: String!
    company: String!
    location: Location!
    dates: [DateRange!]!
    achievements: [String!]!
  }
  
  type ProviderList {
    providers: [Provider!]!
    uuid: String!
  }
  
  type Provider {
    id: Int!
    name: String!
    location: String!
  }
  
  type ProviderPrice {
    id: Int!
    price: Float!
  }
  
  type Query {
    skills(type: SkillType): [Skill!]!
    jobs(state: State): [Job!]!
    providers: ProviderList!
    providerPrices(uuid: String!): [ProviderPrice!]!
  }
`;

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
                }, randomIntFromInterval(2000, 20000))
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
