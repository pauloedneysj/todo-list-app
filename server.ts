import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

async function main() {
  const prisma = new PrismaClient();

  const typeDefs = gql`
    scalar ISODate

    type Todo {
      id: String
      description: String!

      createdAt: ISODate
      updatedAt: ISODate
    }

    type Query {
      todos: [Todo!]!
    }

    type Mutation {
      createTodo(description: String): Todo
    }

    type Mutation {
      updateTodo(id: String, description: String, updatedAt: ISODate): Todo
    }

    type Mutation {
      deleteTodo(id: String): Todo
    }
  `;

  const resolvers = {
    Query: {
      todos: () => {
        return prisma.todo.findMany();
      },
    },

    Mutation: {
      createTodo: (_parents: any, { description }: any, context: any) => {
        return prisma.todo.create({
          data: { description },
        });
      },

      updateTodo: (
        _parents: any,
        { id, description, updatedAt }: any,
        context: any
      ) => {
        return prisma.todo.update({
          where: { id },
          data: { description, updatedAt },
        });
      },

      deleteTodo: (_parents: any, { id }: any, context: any) => {
        return prisma.todo.delete({
          where: { id },
        });
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main();
