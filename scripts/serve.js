const { createYoga } = require('graphql-yoga');
const { createServer } = require('http');
const fs = require('fs');
const path = require('path');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadSchema } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { printSchema } = require('graphql');

async function startServer() {
  try {
    // Load the schema properly
    const schema = await loadSchema(path.join(__dirname, '../.graphclient/schema.graphql'), {
      loaders: [new GraphQLFileLoader()]
    });

    // Print the schema to examine the available query types
    const schemaString = printSchema(schema);
    console.log('Loading schema...');

    // Get the query type and its fields
    const queryType = schema.getQueryType();
    if (!queryType) {
      throw new Error("No Query type found in schema");
    }

    const queryFields = queryType.getFields();
    const queryFieldNames = Object.keys(queryFields);

    console.log('Available Query fields:', queryFieldNames);

    // Create resolvers only for fields that exist in the schema
    const resolvers = {
      Query: {}
    };

    // Create mock data based on entity types in your schema
    queryFieldNames.forEach(fieldName => {
      if (fieldName.includes('tokenBalance')) {
        resolvers.Query[fieldName] = () => {
          return [{
            id: '0xc779ceb0853fa7ab6a38c587c1cfc702e4603d9b-100',
            owner: '0xc779ceb0853fa7ab6a38c587c1cfc702e4603d9b',
            tokenId: '100',
            balance: '1',
            lastUpdated: '1619712000'
          }];
        };
      } else if (fieldName.includes('season7Condition')) {
        resolvers.Query[fieldName] = () => {
          return [{
            id: '0xc779ceb0853fa7ab6a38c587c1cfc702e4603d9b',
            address: '0xc779ceb0853fa7ab6a38c587c1cfc702e4603d9b',
            hasAllRequiredTokens: true,
            token100Balance: '1',
            token101Balance: '1',
            token200Balance: '1',
            token201Balance: '1',
            token300Balance: '1',
            token301Balance: '1',
            token400Balance: '1',
            token401Balance: '1',
            lastUpdated: '1619712000'
          }];
        };
      } else if (fieldName.includes('transferSingle')) {
        resolvers.Query[fieldName] = () => {
          return [{
            id: '0x12345',
            operator: '0xoperator',
            from: '0x0000000000000000000000000000000000000000',
            to: '0xc779ceb0853fa7ab6a38c587c1cfc702e4603d9b',
            internal_id: '100',
            value: '1',
            blockNumber: '5610918',
            blockTimestamp: '1619712000',
            transactionHash: '0xhash'
          }];
        };
      } else {
        // Default empty resolver for other types
        resolvers.Query[fieldName] = () => [];
      }
    });

    // Create an executable schema
    const executableSchema = makeExecutableSchema({
      typeDefs: schema,
      resolvers
    });

    // Create a yoga instance with the executable schema
    const yoga = createYoga({
      schema: executableSchema,
      graphiql: true
    });

    // Create an HTTP server using the yoga middleware
    const server = createServer(yoga);

    // Start the server
    server.listen(4000, () => {
      console.log('🚀 Server is running on http://localhost:4000/graphql');
      console.log('Available Query fields:', queryFieldNames);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

startServer();