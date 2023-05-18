import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
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
    createTodo: async (_parents: any, { description }: any, context: any) => {
      return await prisma.todo.create({
        data: { description },
      });
    },
    updateTodo: async (
      _parents: any,
      { id, description, updatedAt }: any,
      context: any
    ) => {
      return await prisma.todo.update({
        where: { id },
        data: { description, updatedAt },
      });
    },
    deleteTodo: async (_parents: any, { id }: any, context: any) => {
      return await prisma.todo.delete({
        where: { id },
      });
    },
  },
};
