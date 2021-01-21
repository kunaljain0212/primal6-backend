const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { MONGOURI } = require('./keys');

const connect = mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
connect
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log('ERROR in connecting to DATABASE', err);
  });
// R6k23yTWQORONDhE
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

const app = express();
app.use(cors());
server.applyMiddleware({ app });

app.listen({ port: 8000 }, () => console.log(`Now browse to http://localhost:8000${server.graphqlPath}`));
