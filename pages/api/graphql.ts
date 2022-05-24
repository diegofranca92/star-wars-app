import { createServer } from '@graphql-yoga/node'
import { getPeoples } from '../peoples/[id]'

const typeDefs = /* GraphQL */ `
  type Query {
    users: [User!]!,
    peoples: [People],
  }
  type User {
    name: String
  }
  type People {
    name: String,
    films: [String],
    starships: [String],
  }
`

const resolvers = {
  Query: {
    peoples() {
      return getPeoples()
    },
    users() {
      return [{ name: 'Nextjs' }]
    },
  },
}

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: '/api/graphql',
  // graphiql: false // uncomment to disable GraphiQL
})

export default server