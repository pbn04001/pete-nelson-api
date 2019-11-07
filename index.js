import express from 'express';
import serverless from 'serverless-http';
import graphiql from 'graphql-playground-middleware-express';
import { ApolloServer, gql } from 'apollo-server-express';
import {jobs, skills, providers, skillTypes} from './data';

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
    providers: [Provider!]!
    providerPrices: [ProviderPrice!]!
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
            return providers
        },
        providerPrices: () => {
            let id = 1
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([{
                        id: 1,
                        price: randomIntFromInterval(30, 100)
                    }, {
                        id: 2,
                        price: randomIntFromInterval(30, 100)
                    }, {
                        id: 3,
                        price: randomIntFromInterval(30, 100)
                    }, {
                        id: 4,
                        price: randomIntFromInterval(30, 100)
                    }])
                }, randomIntFromInterval(3000, 6000))
            })
        }
    },
    /*Provider: {
        price: (parent, args, ctx, info) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(randomIntFromInterval(30, 100))
                }, randomIntFromInterval(3000, 6000))
            })
        }
    }*/
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
