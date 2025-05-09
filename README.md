# Yoki2 Subgraph (Yoki Legacy)

A subgraph for indexing and querying data from the Yoki Legacy NFT smart contracts on the Soneium network.

## Overview

This subgraph tracks events from two smart contracts:

- Yokis2 (Proxy contract)
- YokiImplAtProxy (Implementation contract)

It provides GraphQL queries to fetch data about:

- Token transfers and balances
- Season qualification conditions (Seasons 7, 8, 9, and 10)
- Token ownership tracking across multiple collections
- Contract administration events

## Features


- Tracks transfer events for ERC1155 tokens
- Maintains token ownership records using a set-based approach
- Calculates seasonal eligibility conditions based on token ownership:
  - Season 7 eligibility for all users
  - Seasons 8, 9, and 10 with progressive qualification logic
- Ensures users can only qualify for one season among Seasons 8, 9, or 10
- Optimized for performance with minimal entity creation and storage

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
yarn deploy yoki2
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