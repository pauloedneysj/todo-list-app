import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ISODate: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<Todo>;
  deleteTodo?: Maybe<Todo>;
  updateTodo?: Maybe<Todo>;
};


export type MutationCreateTodoArgs = {
  description?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteTodoArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTodoArgs = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['ISODate']>;
};

export type Query = {
  __typename?: 'Query';
  todos: Array<Todo>;
};

export type Todo = {
  __typename?: 'Todo';
  createdAt?: Maybe<Scalars['ISODate']>;
  description: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['ISODate']>;
};

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id?: string | null, description: string, createdAt?: any | null, updatedAt?: any | null }> };

export type CreateTodoMutationVariables = Exact<{
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo?: { __typename?: 'Todo', id?: string | null, description: string } | null };

export type UpdateTodoMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['ISODate']>;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo?: { __typename?: 'Todo', id?: string | null, description: string, updatedAt?: any | null } | null };

export type DeleteTodoMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo?: { __typename?: 'Todo', id?: string | null, description: string } | null };

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "createTodo",
            "type": {
              "kind": "OBJECT",
              "name": "Todo",
              "ofType": null
            },
            "args": [
              {
                "name": "description",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "deleteTodo",
            "type": {
              "kind": "OBJECT",
              "name": "Todo",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "updateTodo",
            "type": {
              "kind": "OBJECT",
              "name": "Todo",
              "ofType": null
            },
            "args": [
              {
                "name": "description",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "id",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "updatedAt",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "todos",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Todo",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Todo",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;

export const TodosDocument = gql`
    query Todos {
  todos {
    id
    description
    createdAt
    updatedAt
  }
}
    `;

export function useTodosQuery(options?: Omit<Urql.UseQueryArgs<TodosQueryVariables>, 'query'>) {
  return Urql.useQuery<TodosQuery, TodosQueryVariables>({ query: TodosDocument, ...options });
};
export const CreateTodoDocument = gql`
    mutation CreateTodo($description: String) {
  createTodo(description: $description) {
    id
    description
  }
}
    `;

export function useCreateTodoMutation() {
  return Urql.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument);
};
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($id: String, $description: String, $updatedAt: ISODate) {
  updateTodo(id: $id, description: $description, updatedAt: $updatedAt) {
    id
    description
    updatedAt
  }
}
    `;

export function useUpdateTodoMutation() {
  return Urql.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument);
};
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: String) {
  deleteTodo(id: $id) {
    id
    description
  }
}
    `;

export function useDeleteTodoMutation() {
  return Urql.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument);
};