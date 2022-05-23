import { ApolloServer, gql } from "apollo-server-micro";


const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello() {
      return 'Hello World!';
    },
  },
};

const server = new ApolloServer({
  typeDefs, resolvers,
})

export const config = {
  bodyParser: false,
}

const startServer = server.start()

export default async function handler(req:any, res:any) {
  await startServer
  await server.createHandler({ path: "/api/graphql" })(req, res)
}