// Richard Wilson
// 101370635
// 2/18/2024

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs } = require('./schema.js');
const { resolvers } = require('./resolvers.js');

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const mongoDBAtlasUri = 'mongodb+srv://wilsonjordan:dingus123@101370635comp3133assign.sun0yku.mongodb.net/?retryWrites=true&w=majority';

  mongoose.connect(mongoDBAtlasUri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));

  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running at http://localhost:${port}${apolloServer.graphqlPath}`));
}

startServer();

