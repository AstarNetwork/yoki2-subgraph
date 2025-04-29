// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { Yoki2Types } from './sources/yoki2/types';
import * as importedModule$0 from "./sources/yoki2/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type AdminChanged = {
  id: Scalars['Bytes']['output'];
  previousAdmin: Scalars['Bytes']['output'];
  newAdmin: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type AdminChanged_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_not?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousAdmin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousAdmin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_not?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAdmin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAdmin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AdminChanged_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AdminChanged_filter>>>;
};

export type AdminChanged_orderBy =
  | 'id'
  | 'previousAdmin'
  | 'newAdmin'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type ApprovalForAll = {
  id: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  operator: Scalars['Bytes']['output'];
  approved: Scalars['Boolean']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ApprovalForAll_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  operator?: InputMaybe<Scalars['Bytes']['input']>;
  operator_not?: InputMaybe<Scalars['Bytes']['input']>;
  operator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  operator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  operator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  operator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  operator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  operator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  approved?: InputMaybe<Scalars['Boolean']['input']>;
  approved_not?: InputMaybe<Scalars['Boolean']['input']>;
  approved_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  approved_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ApprovalForAll_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ApprovalForAll_filter>>>;
};

export type ApprovalForAll_orderBy =
  | 'id'
  | 'account'
  | 'operator'
  | 'approved'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type ContractURIUpdated = {
  id: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ContractURIUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ContractURIUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ContractURIUpdated_filter>>>;
};

export type ContractURIUpdated_orderBy =
  | 'id'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Initialized = {
  id: Scalars['Bytes']['output'];
  version: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Initialized_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  version?: InputMaybe<Scalars['BigInt']['input']>;
  version_not?: InputMaybe<Scalars['BigInt']['input']>;
  version_gt?: InputMaybe<Scalars['BigInt']['input']>;
  version_lt?: InputMaybe<Scalars['BigInt']['input']>;
  version_gte?: InputMaybe<Scalars['BigInt']['input']>;
  version_lte?: InputMaybe<Scalars['BigInt']['input']>;
  version_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  version_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Initialized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Initialized_filter>>>;
};

export type Initialized_orderBy =
  | 'id'
  | 'version'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Paused = {
  id: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Paused_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Paused_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Paused_filter>>>;
};

export type Paused_orderBy =
  | 'id'
  | 'account'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  adminChanged?: Maybe<AdminChanged>;
  adminChangeds: Array<AdminChanged>;
  upgraded?: Maybe<Upgraded>;
  upgradeds: Array<Upgraded>;
  approvalForAll?: Maybe<ApprovalForAll>;
  approvalForAlls: Array<ApprovalForAll>;
  contractURIUpdated?: Maybe<ContractURIUpdated>;
  contractURIUpdateds: Array<ContractURIUpdated>;
  initialized?: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  paused?: Maybe<Paused>;
  pauseds: Array<Paused>;
  roleAdminChanged?: Maybe<RoleAdminChanged>;
  roleAdminChangeds: Array<RoleAdminChanged>;
  roleGranted?: Maybe<RoleGranted>;
  roleGranteds: Array<RoleGranted>;
  roleRevoked?: Maybe<RoleRevoked>;
  roleRevokeds: Array<RoleRevoked>;
  transferBatch?: Maybe<TransferBatch>;
  transferBatches: Array<TransferBatch>;
  transferSingle?: Maybe<TransferSingle>;
  transferSingles: Array<TransferSingle>;
  uri?: Maybe<URI>;
  uris: Array<URI>;
  unpaused?: Maybe<Unpaused>;
  unpauseds: Array<Unpaused>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryadminChangedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryadminChangedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AdminChanged_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AdminChanged_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupgradedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryupgradedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Upgraded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Upgraded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryapprovalForAllArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryapprovalForAllsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ApprovalForAll_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ApprovalForAll_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycontractURIUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycontractURIUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ContractURIUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ContractURIUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryinitializedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryinitializedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Initialized_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Initialized_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypausedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypausedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Paused_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Paused_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleAdminChangedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleAdminChangedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoleAdminChanged_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RoleAdminChanged_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleGrantedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleGrantedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoleGranted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RoleGranted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleRevokedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroleRevokedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RoleRevoked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RoleRevoked_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferBatchArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferBatchesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransferBatch_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferBatch_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferSingleArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferSinglesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TransferSingle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TransferSingle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuriArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryurisArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<URI_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<URI_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunpausedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunpausedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Unpaused_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Unpaused_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type RoleAdminChanged = {
  id: Scalars['Bytes']['output'];
  role: Scalars['Bytes']['output'];
  previousAdminRole: Scalars['Bytes']['output'];
  newAdminRole: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type RoleAdminChanged_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role?: InputMaybe<Scalars['Bytes']['input']>;
  role_not?: InputMaybe<Scalars['Bytes']['input']>;
  role_gt?: InputMaybe<Scalars['Bytes']['input']>;
  role_lt?: InputMaybe<Scalars['Bytes']['input']>;
  role_gte?: InputMaybe<Scalars['Bytes']['input']>;
  role_lte?: InputMaybe<Scalars['Bytes']['input']>;
  role_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_not?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_gt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_lt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_gte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_lte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousAdminRole_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousAdminRole_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdminRole_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_not?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAdminRole_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAdminRole_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdminRole_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RoleAdminChanged_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RoleAdminChanged_filter>>>;
};

export type RoleAdminChanged_orderBy =
  | 'id'
  | 'role'
  | 'previousAdminRole'
  | 'newAdminRole'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type RoleGranted = {
  id: Scalars['Bytes']['output'];
  role: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  sender: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type RoleGranted_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role?: InputMaybe<Scalars['Bytes']['input']>;
  role_not?: InputMaybe<Scalars['Bytes']['input']>;
  role_gt?: InputMaybe<Scalars['Bytes']['input']>;
  role_lt?: InputMaybe<Scalars['Bytes']['input']>;
  role_gte?: InputMaybe<Scalars['Bytes']['input']>;
  role_lte?: InputMaybe<Scalars['Bytes']['input']>;
  role_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RoleGranted_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RoleGranted_filter>>>;
};

export type RoleGranted_orderBy =
  | 'id'
  | 'role'
  | 'account'
  | 'sender'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type RoleRevoked = {
  id: Scalars['Bytes']['output'];
  role: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  sender: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type RoleRevoked_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role?: InputMaybe<Scalars['Bytes']['input']>;
  role_not?: InputMaybe<Scalars['Bytes']['input']>;
  role_gt?: InputMaybe<Scalars['Bytes']['input']>;
  role_lt?: InputMaybe<Scalars['Bytes']['input']>;
  role_gte?: InputMaybe<Scalars['Bytes']['input']>;
  role_lte?: InputMaybe<Scalars['Bytes']['input']>;
  role_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  role_contains?: InputMaybe<Scalars['Bytes']['input']>;
  role_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RoleRevoked_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RoleRevoked_filter>>>;
};

export type RoleRevoked_orderBy =
  | 'id'
  | 'role'
  | 'account'
  | 'sender'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type TransferBatch = {
  id: Scalars['Bytes']['output'];
  operator: Scalars['Bytes']['output'];
  from: Scalars['Bytes']['output'];
  to: Scalars['Bytes']['output'];
  ids: Array<Scalars['BigInt']['output']>;
  values: Array<Scalars['BigInt']['output']>;
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TransferBatch_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  operator?: InputMaybe<Scalars['Bytes']['input']>;
  operator_not?: InputMaybe<Scalars['Bytes']['input']>;
  operator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  operator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  operator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  operator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  operator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  operator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  ids?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ids_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ids_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ids_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ids_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ids_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TransferBatch_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TransferBatch_filter>>>;
};

export type TransferBatch_orderBy =
  | 'id'
  | 'operator'
  | 'from'
  | 'to'
  | 'ids'
  | 'values'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type TransferSingle = {
  id: Scalars['Bytes']['output'];
  operator: Scalars['Bytes']['output'];
  from: Scalars['Bytes']['output'];
  to: Scalars['Bytes']['output'];
  internal_id: Scalars['BigInt']['output'];
  value: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TransferSingle_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  operator?: InputMaybe<Scalars['Bytes']['input']>;
  operator_not?: InputMaybe<Scalars['Bytes']['input']>;
  operator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  operator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  operator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  operator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  operator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  operator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  operator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from?: InputMaybe<Scalars['Bytes']['input']>;
  from_not?: InputMaybe<Scalars['Bytes']['input']>;
  from_gt?: InputMaybe<Scalars['Bytes']['input']>;
  from_lt?: InputMaybe<Scalars['Bytes']['input']>;
  from_gte?: InputMaybe<Scalars['Bytes']['input']>;
  from_lte?: InputMaybe<Scalars['Bytes']['input']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  from_contains?: InputMaybe<Scalars['Bytes']['input']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  internal_id?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  internal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TransferSingle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TransferSingle_filter>>>;
};

export type TransferSingle_orderBy =
  | 'id'
  | 'operator'
  | 'from'
  | 'to'
  | 'internal_id'
  | 'value'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type URI = {
  id: Scalars['Bytes']['output'];
  value: Scalars['String']['output'];
  internal_id: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type URI_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
  value_not?: InputMaybe<Scalars['String']['input']>;
  value_gt?: InputMaybe<Scalars['String']['input']>;
  value_lt?: InputMaybe<Scalars['String']['input']>;
  value_gte?: InputMaybe<Scalars['String']['input']>;
  value_lte?: InputMaybe<Scalars['String']['input']>;
  value_in?: InputMaybe<Array<Scalars['String']['input']>>;
  value_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  value_contains?: InputMaybe<Scalars['String']['input']>;
  value_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  value_not_contains?: InputMaybe<Scalars['String']['input']>;
  value_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  value_starts_with?: InputMaybe<Scalars['String']['input']>;
  value_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  value_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  value_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  value_ends_with?: InputMaybe<Scalars['String']['input']>;
  value_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  value_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  value_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  internal_id?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  internal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  internal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<URI_filter>>>;
  or?: InputMaybe<Array<InputMaybe<URI_filter>>>;
};

export type URI_orderBy =
  | 'id'
  | 'value'
  | 'internal_id'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Unpaused = {
  id: Scalars['Bytes']['output'];
  account: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Unpaused_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account?: InputMaybe<Scalars['Bytes']['input']>;
  account_not?: InputMaybe<Scalars['Bytes']['input']>;
  account_gt?: InputMaybe<Scalars['Bytes']['input']>;
  account_lt?: InputMaybe<Scalars['Bytes']['input']>;
  account_gte?: InputMaybe<Scalars['Bytes']['input']>;
  account_lte?: InputMaybe<Scalars['Bytes']['input']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  account_contains?: InputMaybe<Scalars['Bytes']['input']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Unpaused_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Unpaused_filter>>>;
};

export type Unpaused_orderBy =
  | 'id'
  | 'account'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Upgraded = {
  id: Scalars['Bytes']['output'];
  implementation: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Upgraded_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  implementation?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  implementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  implementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Upgraded_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Upgraded_filter>>>;
};

export type Upgraded_orderBy =
  | 'id'
  | 'implementation'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AdminChanged: ResolverTypeWrapper<AdminChanged>;
  AdminChanged_filter: AdminChanged_filter;
  AdminChanged_orderBy: AdminChanged_orderBy;
  Aggregation_interval: Aggregation_interval;
  ApprovalForAll: ResolverTypeWrapper<ApprovalForAll>;
  ApprovalForAll_filter: ApprovalForAll_filter;
  ApprovalForAll_orderBy: ApprovalForAll_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  ContractURIUpdated: ResolverTypeWrapper<ContractURIUpdated>;
  ContractURIUpdated_filter: ContractURIUpdated_filter;
  ContractURIUpdated_orderBy: ContractURIUpdated_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Initialized: ResolverTypeWrapper<Initialized>;
  Initialized_filter: Initialized_filter;
  Initialized_orderBy: Initialized_orderBy;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  OrderDirection: OrderDirection;
  Paused: ResolverTypeWrapper<Paused>;
  Paused_filter: Paused_filter;
  Paused_orderBy: Paused_orderBy;
  Query: ResolverTypeWrapper<{}>;
  RoleAdminChanged: ResolverTypeWrapper<RoleAdminChanged>;
  RoleAdminChanged_filter: RoleAdminChanged_filter;
  RoleAdminChanged_orderBy: RoleAdminChanged_orderBy;
  RoleGranted: ResolverTypeWrapper<RoleGranted>;
  RoleGranted_filter: RoleGranted_filter;
  RoleGranted_orderBy: RoleGranted_orderBy;
  RoleRevoked: ResolverTypeWrapper<RoleRevoked>;
  RoleRevoked_filter: RoleRevoked_filter;
  RoleRevoked_orderBy: RoleRevoked_orderBy;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  TransferBatch: ResolverTypeWrapper<TransferBatch>;
  TransferBatch_filter: TransferBatch_filter;
  TransferBatch_orderBy: TransferBatch_orderBy;
  TransferSingle: ResolverTypeWrapper<TransferSingle>;
  TransferSingle_filter: TransferSingle_filter;
  TransferSingle_orderBy: TransferSingle_orderBy;
  URI: ResolverTypeWrapper<URI>;
  URI_filter: URI_filter;
  URI_orderBy: URI_orderBy;
  Unpaused: ResolverTypeWrapper<Unpaused>;
  Unpaused_filter: Unpaused_filter;
  Unpaused_orderBy: Unpaused_orderBy;
  Upgraded: ResolverTypeWrapper<Upgraded>;
  Upgraded_filter: Upgraded_filter;
  Upgraded_orderBy: Upgraded_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AdminChanged: AdminChanged;
  AdminChanged_filter: AdminChanged_filter;
  ApprovalForAll: ApprovalForAll;
  ApprovalForAll_filter: ApprovalForAll_filter;
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  ContractURIUpdated: ContractURIUpdated;
  ContractURIUpdated_filter: ContractURIUpdated_filter;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Initialized: Initialized;
  Initialized_filter: Initialized_filter;
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  Paused: Paused;
  Paused_filter: Paused_filter;
  Query: {};
  RoleAdminChanged: RoleAdminChanged;
  RoleAdminChanged_filter: RoleAdminChanged_filter;
  RoleGranted: RoleGranted;
  RoleGranted_filter: RoleGranted_filter;
  RoleRevoked: RoleRevoked;
  RoleRevoked_filter: RoleRevoked_filter;
  String: Scalars['String']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  TransferBatch: TransferBatch;
  TransferBatch_filter: TransferBatch_filter;
  TransferSingle: TransferSingle;
  TransferSingle_filter: TransferSingle_filter;
  URI: URI;
  URI_filter: URI_filter;
  Unpaused: Unpaused;
  Unpaused_filter: Unpaused_filter;
  Upgraded: Upgraded;
  Upgraded_filter: Upgraded_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AdminChangedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AdminChanged'] = ResolversParentTypes['AdminChanged']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  previousAdmin?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  newAdmin?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ApprovalForAllResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ApprovalForAll'] = ResolversParentTypes['ApprovalForAll']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  approved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type ContractURIUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ContractURIUpdated'] = ResolversParentTypes['ContractURIUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InitializedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Initialized'] = ResolversParentTypes['Initialized']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type PausedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Paused'] = ResolversParentTypes['Paused']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  adminChanged?: Resolver<Maybe<ResolversTypes['AdminChanged']>, ParentType, ContextType, RequireFields<QueryadminChangedArgs, 'id' | 'subgraphError'>>;
  adminChangeds?: Resolver<Array<ResolversTypes['AdminChanged']>, ParentType, ContextType, RequireFields<QueryadminChangedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  upgraded?: Resolver<Maybe<ResolversTypes['Upgraded']>, ParentType, ContextType, RequireFields<QueryupgradedArgs, 'id' | 'subgraphError'>>;
  upgradeds?: Resolver<Array<ResolversTypes['Upgraded']>, ParentType, ContextType, RequireFields<QueryupgradedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  approvalForAll?: Resolver<Maybe<ResolversTypes['ApprovalForAll']>, ParentType, ContextType, RequireFields<QueryapprovalForAllArgs, 'id' | 'subgraphError'>>;
  approvalForAlls?: Resolver<Array<ResolversTypes['ApprovalForAll']>, ParentType, ContextType, RequireFields<QueryapprovalForAllsArgs, 'skip' | 'first' | 'subgraphError'>>;
  contractURIUpdated?: Resolver<Maybe<ResolversTypes['ContractURIUpdated']>, ParentType, ContextType, RequireFields<QuerycontractURIUpdatedArgs, 'id' | 'subgraphError'>>;
  contractURIUpdateds?: Resolver<Array<ResolversTypes['ContractURIUpdated']>, ParentType, ContextType, RequireFields<QuerycontractURIUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  initialized?: Resolver<Maybe<ResolversTypes['Initialized']>, ParentType, ContextType, RequireFields<QueryinitializedArgs, 'id' | 'subgraphError'>>;
  initializeds?: Resolver<Array<ResolversTypes['Initialized']>, ParentType, ContextType, RequireFields<QueryinitializedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  paused?: Resolver<Maybe<ResolversTypes['Paused']>, ParentType, ContextType, RequireFields<QuerypausedArgs, 'id' | 'subgraphError'>>;
  pauseds?: Resolver<Array<ResolversTypes['Paused']>, ParentType, ContextType, RequireFields<QuerypausedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  roleAdminChanged?: Resolver<Maybe<ResolversTypes['RoleAdminChanged']>, ParentType, ContextType, RequireFields<QueryroleAdminChangedArgs, 'id' | 'subgraphError'>>;
  roleAdminChangeds?: Resolver<Array<ResolversTypes['RoleAdminChanged']>, ParentType, ContextType, RequireFields<QueryroleAdminChangedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  roleGranted?: Resolver<Maybe<ResolversTypes['RoleGranted']>, ParentType, ContextType, RequireFields<QueryroleGrantedArgs, 'id' | 'subgraphError'>>;
  roleGranteds?: Resolver<Array<ResolversTypes['RoleGranted']>, ParentType, ContextType, RequireFields<QueryroleGrantedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  roleRevoked?: Resolver<Maybe<ResolversTypes['RoleRevoked']>, ParentType, ContextType, RequireFields<QueryroleRevokedArgs, 'id' | 'subgraphError'>>;
  roleRevokeds?: Resolver<Array<ResolversTypes['RoleRevoked']>, ParentType, ContextType, RequireFields<QueryroleRevokedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transferBatch?: Resolver<Maybe<ResolversTypes['TransferBatch']>, ParentType, ContextType, RequireFields<QuerytransferBatchArgs, 'id' | 'subgraphError'>>;
  transferBatches?: Resolver<Array<ResolversTypes['TransferBatch']>, ParentType, ContextType, RequireFields<QuerytransferBatchesArgs, 'skip' | 'first' | 'subgraphError'>>;
  transferSingle?: Resolver<Maybe<ResolversTypes['TransferSingle']>, ParentType, ContextType, RequireFields<QuerytransferSingleArgs, 'id' | 'subgraphError'>>;
  transferSingles?: Resolver<Array<ResolversTypes['TransferSingle']>, ParentType, ContextType, RequireFields<QuerytransferSinglesArgs, 'skip' | 'first' | 'subgraphError'>>;
  uri?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType, RequireFields<QueryuriArgs, 'id' | 'subgraphError'>>;
  uris?: Resolver<Array<ResolversTypes['URI']>, ParentType, ContextType, RequireFields<QueryurisArgs, 'skip' | 'first' | 'subgraphError'>>;
  unpaused?: Resolver<Maybe<ResolversTypes['Unpaused']>, ParentType, ContextType, RequireFields<QueryunpausedArgs, 'id' | 'subgraphError'>>;
  unpauseds?: Resolver<Array<ResolversTypes['Unpaused']>, ParentType, ContextType, RequireFields<QueryunpausedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type RoleAdminChangedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RoleAdminChanged'] = ResolversParentTypes['RoleAdminChanged']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  previousAdminRole?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  newAdminRole?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoleGrantedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RoleGranted'] = ResolversParentTypes['RoleGranted']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoleRevokedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RoleRevoked'] = ResolversParentTypes['RoleRevoked']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TransferBatchResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TransferBatch'] = ResolversParentTypes['TransferBatch']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  ids?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransferSingleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TransferSingle'] = ResolversParentTypes['TransferSingle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  internal_id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type URIResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['URI'] = ResolversParentTypes['URI']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  internal_id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UnpausedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Unpaused'] = ResolversParentTypes['Unpaused']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpgradedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Upgraded'] = ResolversParentTypes['Upgraded']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  implementation?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  AdminChanged?: AdminChangedResolvers<ContextType>;
  ApprovalForAll?: ApprovalForAllResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  ContractURIUpdated?: ContractURIUpdatedResolvers<ContextType>;
  Initialized?: InitializedResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Paused?: PausedResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RoleAdminChanged?: RoleAdminChangedResolvers<ContextType>;
  RoleGranted?: RoleGrantedResolvers<ContextType>;
  RoleRevoked?: RoleRevokedResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  TransferBatch?: TransferBatchResolvers<ContextType>;
  TransferSingle?: TransferSingleResolvers<ContextType>;
  URI?: URIResolvers<ContextType>;
  Unpaused?: UnpausedResolvers<ContextType>;
  Upgraded?: UpgradedResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = Yoki2Types.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/yoki2/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const yoki2Transforms = [];
const additionalTypeDefs = [] as any[];
const yoki2Handler = new GraphqlHandler({
              name: "yoki2",
              config: {"endpoint":"https://api.studio.thegraph.com/query/64002/yoki2/version/latest"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("yoki2"),
              logger: logger.child("yoki2"),
              importFn,
            });
sources[0] = {
          name: 'yoki2',
          handler: yoki2Handler,
          transforms: yoki2Transforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })
const documentHashMap = {
        "7b024e9d48cf2a550ef0e782b3a1c21f1f8d2a783577c52c48069091e788b75f": Season7singleDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: Season7singleDocument,
        get rawSDL() {
          return printWithCache(Season7singleDocument);
        },
        location: 'Season7singleDocument.graphql',
        sha256Hash: '7b024e9d48cf2a550ef0e782b3a1c21f1f8d2a783577c52c48069091e788b75f'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type season7singleQueryVariables = Exact<{ [key: string]: never; }>;


export type season7singleQuery = { transferSingles: Array<Pick<TransferSingle, 'to' | 'from' | 'internal_id'>> };


export const season7singleDocument = gql`
    query season7single {
  transferSingles(
    where: {to: "0xc779ceb0853fa7ab6a38c587c1cfc702e4603d9b", from: "0x0000000000000000000000000000000000000000", internal_id_gt: "99", internal_id_lt: "402"}
    first: 100
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    to
    from
    internal_id
  }
}
    ` as unknown as DocumentNode<season7singleQuery, season7singleQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    season7single(variables?: season7singleQueryVariables, options?: C): Promise<season7singleQuery> {
      return requester<season7singleQuery, season7singleQueryVariables>(season7singleDocument, variables, options) as Promise<season7singleQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;