const { createServer } = require('@graphql-yoga/node');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const fs = require('fs');
const path = require('path');

// Load the generated schema
const schema = loadSchemaSync(path.join(__dirname, '../.graphclient/schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

// Read the resolver module
const { resolvers } = require('../.graphclient');

// Create the server
const server = createServer({
  schema,
  context: resolvers.context,
  graphiql: true
});

// Start the server
server.start().then(() => {
  console.log('🚀 Server is running on http://localhost:4000/graphql');
});