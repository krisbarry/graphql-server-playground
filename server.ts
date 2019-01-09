import "reflect-metadata"
import * as path from "path"
import { Container } from "typedi"
import { ApolloServer } from "apollo-server"
import { useContainer, buildSchema } from "type-graphql"
import { ScheduleResolver } from "./src/schedule-resolver"


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

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    playground: true
  })

  // Start the server
  const { url } = await server.listen(4000)
  console.log(`Server is running, GraphQL Playground available at ${url}`)
}

bootstrap()
