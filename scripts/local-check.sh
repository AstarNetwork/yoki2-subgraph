#!/bin/bash

echo "========== GRAPH NODE STATUS =========="
curl -s http://localhost:8030/graphql -X POST -d '{"query": "{ indexingStatuses { subgraph health error { message } } }"}' -H "Content-Type: application/json" | jq

echo "\n========== YOKI2 INDEXING PROGRESS =========="
curl -s http://localhost:8030/graphql -X POST -d '{"query": "{ indexingStatusForCurrentVersion(subgraphName: \"yoki2\") { chains { network { name } latestBlock { number } chainHeadBlock { number } } } }"}' -H "Content-Type: application/json" | jq

echo "\n========== REGISTERED SUBGRAPHS =========="
curl -s -X POST -H "Content-Type: application/json" -d '{"query": "{subgraphs{id name}}"}' http://localhost:8000/graphql | jq