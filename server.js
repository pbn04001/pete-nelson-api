const { ApolloServer, gql } = require('apollo-server')
const { skills, skillTypes } = require('./data')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    skills(type: SkillType): [Skill!]!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        skills: (obj, args) => {
            console.log(args)
            if (args.type) {
                return skills.filter(skill => skill.type === args.type)
            }
            return skills
        }
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
