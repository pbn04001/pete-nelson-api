import express from 'express';
import serverless from 'serverless-http';
import graphiql from 'graphql-playground-middleware-express';
import { ApolloServer, gql } from 'apollo-server-express';
import { jobs, skills } from './data';
import schema from './schema'

const AWS = require('aws-sdk');

// Test2

const dynamoDbTableName = 'providerPricingTable'
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const dynamoDbTableParams = {
    TableName: dynamoDbTableName,
};

const typeDefs = gql`${schema}`;

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
    },
};

const app = express();
const index = new ApolloServer({
    typeDefs,
    resolvers,
    path: '/graphql'
});
const deployedUrl = '/dev' //process.env.ENVIRONMENT === 'PROD' ? '/prod' : '/dev'
index.applyMiddleware({ app });
app.get('/playground', graphiql({ endpoint: `${!process.env.IS_OFFLINE ? deployedUrl : ''}/graphql` }));
const handler = serverless(app);
export { handler };
