import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  try {
    await mongoose.connect('mongodb+srv://ulanivan:Aleksandra1@cluster0-6ezll.mongodb.net/test?retryWrites=true', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
      console.log('Mongo connection!')
    });
  } catch (error) {
    console.log(error)
  }

  app.listen({ port: 4001 }, () =>
    console.log(`Server ready at http://localhost:4001${server.graphqlPath}`)
  )
}

startServer();
