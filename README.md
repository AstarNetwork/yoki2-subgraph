# Yoki2 Subgraph

A subgraph for indexing and querying data from the Yoki NFT smart contracts on the Soneium network.

## Overview

This subgraph tracks events from two smart contracts:

- Yokis2 (Proxy contract)
- YokiImplAtProxy (Implementation contract)

It provides powerful GraphQL queries to fetch data about:

- Token transfers and balances
- Special conditions for Season 7 tokens
- Contract administration events

## Features

- Tracks transfer events for NFT tokens
- Maintains user token balances
- Calculates Season 7 eligibility conditions based on token ownership
- Records administrative events (roles, pausing, etc.)

## Setup

1. Install dependencies:

```bash
yarn
```

2. Generate AssemblyScript types from subgraph schema and ABIs:

```bash
yarn codegen
```

3. Build the subgraph:

```bash
yarn build
```

## Local Development

To run a local Graph Node for development:

1. Start local services:

```bash
docker-compose up -d
```

2. Create and deploy the subgraph locally:

```bash
yarn create-local
yarn deploy-local
```

## Deployment

To deploy to The Graph Studio:

```bash
yarn deploy
```

## Query Examples

You can find example queries in the `queries` directory:

- `season7condition.graphql` - Query Season 7 conditions
- `season7single.graphql` - Query individual Season 7 data
- `season7userCondition.graphql` - Query user-specific Season 7 conditions

## Testing

Run the test suite:

```bash
yarn test
```

Tests are located in the `tests` directory.

## License

UNLICENSED