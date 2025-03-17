const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    type User {
      id: ID!
      username: String!
      birthDate: String!
      email: String!
      phone: String!
    }

    type Todo {
      id: ID!
      todo: String!
      completed: Boolean!
      userId: ID!
      user: User
    }

    type Query {
      getTodos: [Todo]!
      getTodo (id: ID!): Todo!
      getUsers: [User]!
      getUser (id: ID!): User!
    }
    `,
    resolvers: {
      Todo: {
        user: async (todo) =>
          (await axios.get(`https://dummyjson.com/users/${todo.userId}`)).data,
      },
      Query: {
        getTodos: async () =>
          (await axios.get(`https://dummyjson.com/todos`)).data.todos,
        getTodo: async (parent, { id }) =>
          (await axios.get(`https://dummyjson.com/todos/${id}`)).data,
        getUsers: async () =>
          (await axios.get(`https://dummyjson.com/users`)).data.users,
        getUser: async (parent, { id }) =>
          (await axios.get(`https://dummyjson.com/users/${id}`)).data,
      },
    },
  });

  await server.start();

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => {
    console.log("server started...");
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
