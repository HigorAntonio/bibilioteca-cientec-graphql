require('dotenv/config');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const routes = require('./routes');

const resolvers = require('./resolvers');

require('./database');
require('./redisClient');

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(routes);

const schemaPath = 'src/schema/index.graphql'; //O caminho deve ser absoluto
const server = new ApolloServer({
  typeDefs: importSchema(schemaPath),
  resolvers,
});
server.applyMiddleware({app});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})