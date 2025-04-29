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
    // Load the schema
    const schema = await loadSchema(path.join(__dirname, '../.graphclient/schema.graphql'), {
      loaders: [new GraphQLFileLoader()]
    });

    console.log('Loading schema...');

    // Get query fields
    const queryType = schema.getQueryType();
    if (!queryType) {
      throw new Error("No Query type found in schema");
    }

    const queryFields = queryType.getFields();
    const queryFieldNames = Object.keys(queryFields);
    console.log('Available Query fields:', queryFieldNames);

    // Create resolvers with error handling
    const resolvers = {
      Query: {}
    };

    queryFieldNames.forEach(fieldName => {
      resolvers.Query[fieldName] = async (parent, args, context, info) => {
        try {
          // Add subgraphError: allow to all queries
          if (args && !args.subgraphError) {
            args.subgraphError = 'allow';
          }

          let result = [];

          // Mock data based on the field type
          if (fieldName.includes('tokenBalance')) {
            result = [{
              id: '0xc779ceb0853fa7ab6a38c587c1cfc702e4603d9b-100',
              owner: '0xc779ceb0853fa7ab6a38c587c1cfc702e4603d9b',
              tokenId: '100',
              balance: '1',
              lastUpdated: '1619712000'
            }];
          } else if (fieldName.includes('season7Condition')) {
            result = [{
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
          } else if (fieldName.includes('transferSingle')) {
            result = [{
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
          }

          return result;
        } catch (error) {
          console.error(`Error in resolver for ${fieldName}:`, error);
          return [];
        }
      };
    });

    // Create an executable schema
    const executableSchema = makeExecutableSchema({
      typeDefs: schema,
      resolvers
    });

    // Create yoga instance with error handling
    const yoga = createYoga({
      schema: executableSchema,
      graphiql: true,
      maskedErrors: false, // Show all errors for debugging
      landingPage: false
    });

    const server = createServer(yoga);

    server.listen(4000, () => {
      console.log('🚀 Server is running on http://localhost:4000/graphql');
      console.log('Use GraphiQL to explore your API and see any errors');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

startServer();