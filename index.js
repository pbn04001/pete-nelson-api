import express from 'express';
import serverless from 'serverless-http';
import graphiql from 'graphql-playground-middleware-express';
import { ApolloServer, gql } from 'apollo-server-express';
import {jobs, skills, skillTypes} from './data';

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
  
  type Query {
    skills(type: SkillType): [Skill!]!
    jobs(state: State): [Job!]!
  }
`;

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
        }

    }
};
const app = express();
const index = new ApolloServer({
    typeDefs,
    resolvers,
    path: '/graphql'
});index.applyMiddleware({ app });
app.get('/playground', graphiql({ endpoint: '/dev/graphql' }));
const handler = serverless(app);
export { handler };
