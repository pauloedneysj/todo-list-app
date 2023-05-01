import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

async function main() {
  const prisma = new PrismaClient();

  const typeDefs = gql`
    scalar ISODate

    type Todo {
      id: String!
      description: String!
      createdAt: ISODate!
      updatedAt: ISODate!
    }

    input Pagination {
      limit: Int!
      offset: Int!
    }

    type Todos {
      value: [Todo!]!
      totalPages: Int!
    }

    type Query {
      todos(pagination: Pagination): Todos
    }

    type Mutation {
      createTodo(description: String!): Todo
      updateTodo(id: String!, description: String!, updatedAt: ISODate!): Todo
      deleteTodo(id: String!): Todo
    }
  `;

  const resolvers = {
    Query: {
      todos: async (_parents: any, { pagination }: any, context: any) => {
        const todos = await prisma.todo.findMany({
          skip: pagination.offset,
          take: pagination.limit,
          orderBy: { createdAt: "desc" },
        });

        const { length } = await prisma.todo.findMany();

        const todosResponse = {
          value: todos,
          totalPages: Math.ceil(length / 5),
        };

        return todosResponse;
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
