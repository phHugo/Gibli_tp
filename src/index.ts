import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolver.js';
import { TrackAPI } from "./datasources/trackAPI.js";
import { typeDefs } from "./schema.js";
import { GhibliAPI } from "./datasources/ghibliAPI.js";


const server = new ApolloServer({
  typeDefs,
  resolvers
})

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000},
  context: async () => {
    const cache = server.cache
    return {
      dataSources: {
        trackAPI: new TrackAPI({cache}),
        ghibliAPI: new GhibliAPI({cache})
      }
    }
  }
})

console.log(`🚀  Server ready at: ${url}`)