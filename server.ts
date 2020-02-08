import "reflect-metadata"
import * as path from "path"
import { Container } from "typedi"
import * as express from 'express'
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express'
import { useContainer, buildSchema } from "type-graphql"
import { ScheduleResolver } from "./src/schedule-resolver"

const PORT = process.env.PORT || 4000

async function bootstrap() {
  // register the 3rd party IOC container (for DI)
  useContainer(Container)

  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    validate: false,
    resolvers: [ScheduleResolver],
    // automatically create `schema.gql` file with schema definition in current folder
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  })

  /*/ Create GraphQL server
  const server = new ApolloServer({
    schema,
    playground: true
  })

  // Start the server
  const { url } = await server.listen(4000)
  console.log(`Server is running, GraphQL Playground available at ${url}`)*/

  const app = express()
  const apolloServer = new ApolloServer({
    schema,
    playground: true
  })
  apolloServer.applyMiddleware({ app })
  const httpServer = createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)
  await httpServer.listen({ port: PORT }, () => {
    console.log(`GraphQL server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    console.log(`Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
  })
}

bootstrap()
