import express from 'express';
import serverless from 'serverless-http';
import graphiql from 'graphql-playground-middleware-express';
import { ApolloServer, gql } from 'apollo-server-express';
import { skills, skillTypes } from './data';

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
  
  type Skill {
    type: SkillType!
    name: String!
  }
  
  type Query {
    skills(type: SkillType): [Skill!]!
  }
`;

const resolvers = {
    Query: {
        skills: (obj, args) => {
            console.log(args)
            if (args.type) {
                return skills.filter(skill => skill.type === args.type)
            }
            return skills
        }
    }
};
const app = express();
const index = new ApolloServer({
    typeDefs,
    resolvers,
    path: '/graphql'
});index.applyMiddleware({ app });
app.get('/playground', graphiql({ endpoint: '/graphql' }));
const handler = serverless(app);
export { handler };
