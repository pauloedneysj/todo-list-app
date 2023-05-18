import gql from "graphql-tag";

export default gql`
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
