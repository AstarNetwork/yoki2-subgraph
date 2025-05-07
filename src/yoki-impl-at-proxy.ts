import {
  ApprovalForAll as ApprovalForAllEvent,
  ContractURIUpdated as ContractURIUpdatedEvent,
  Initialized as InitializedEvent,
  Paused as PausedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
  Unpaused as UnpausedEvent,
} from "../generated/YokiImplAtProxy/YokiImpl"  // Updated import path
import {
  ApprovalForAll,
  ContractURIUpdated,
  Initialized,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TransferBatch,
  TransferSingle,
  URI,
  Unpaused,
} from "../generated/schema"
import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { AddressTokens } from "../generated/schema"

// Import all helpers from the new file
import {
  ZERO_ADDRESS,
  getActiveSeason,
  updateSeason7Condition,
  updateSeason8Condition,
  updateSeason9Condition,
  updateSeason10Condition,
  SEASON7_TOKENS
} from './season-helpers'

const ZERO_BI = BigInt.fromI32(0);
const NON_YOKI_BI = BigInt.fromI32(13);

// Convert string to Bytes for addresses
function addressToBytes(address: string): Bytes {
  return Bytes.fromHexString(address);
}

// Add/remove tokens from an address's set
function updateAddressTokens(address: string, tokenId: BigInt, adding: boolean, blockTimestamp: BigInt): void {
  const addressBytes = addressToBytes(address);
  let addressTokens = AddressTokens.load(addressBytes);

  if (!addressTokens) {
    addressTokens = new AddressTokens(addressBytes);
    addressTokens.ownedTokens = [];
  }

  let tokens = addressTokens.ownedTokens;

  if (adding) {
    // Add token if not already in the set
    if (!tokens.includes(tokenId)) {
      tokens.push(tokenId);
    }
  } else {
    // Remove token if in the set
    const index = tokens.indexOf(tokenId);
    if (index > -1) {
      tokens = tokens.slice(0, index).concat(tokens.slice(index + 1));
    }
  }

  addressTokens.ownedTokens = tokens;
  addressTokens.lastUpdated = blockTimestamp;
  addressTokens.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleContractURIUpdated(event: ContractURIUpdatedEvent): void {
  let entity = new ContractURIUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// Helper function to handle token transfers and update conditions
function handleTokenTransfer(
  fromAddress: string,
  toAddress: string,
  tokenId: BigInt,
  timestamp: BigInt
): void {

  let updateFrom = false;
  let updateTo = false;

  // Handle token ownership updates for sender
  if (fromAddress != ZERO_ADDRESS) {
    updateAddressTokens(fromAddress, tokenId, false, timestamp);
    updateFrom = true;
  }

  // Handle token ownership updates for receiver
  if (toAddress != ZERO_ADDRESS) {
    updateAddressTokens(toAddress, tokenId, true, timestamp);
    updateTo = true;
  }

  // Only update season conditions if we processed valid tokens
  if (updateFrom || updateTo) {
    const season = getActiveSeason(timestamp);

    // Update sender conditions if needed
    if (updateFrom) {
      // Season 7 is always updated
      if (season == 7) updateSeason7Condition(fromAddress, timestamp);

      // For other seasons, update according to progressive rules
      else if (season == 8) updateSeason8Condition(fromAddress, timestamp);
      else if (season == 9) updateSeason9Condition(fromAddress, timestamp);
      else if (season == 10) updateSeason10Condition(fromAddress, timestamp);
    }

    // Update receiver conditions if needed
    if (updateTo) {
      // Season 7 is always updated
      if (season == 7) updateSeason7Condition(toAddress, timestamp);

      // For other seasons, update according to progressive rules
      else if (season == 8) updateSeason8Condition(toAddress, timestamp);
      else if (season == 9) updateSeason9Condition(toAddress, timestamp);
      else if (season == 10) updateSeason10Condition(toAddress, timestamp);
    }
  }
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );

  entity.tokenId = event.params.id;
  // Skip non-Yoki tokens early
  if (event.params.id.lt(NON_YOKI_BI)) {
    return;
  }
  entity.operator = event.params.operator;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();


  const fromAddress = event.params.from.toHexString();
  const toAddress = event.params.to.toHexString();

  // Use new helper function
  handleTokenTransfer(
    fromAddress,
    toAddress,
    event.params.id,
    event.block.timestamp
  );
}

// For handleTransferBatch
export function handleTransferBatch(event: TransferBatchEvent): void {
  const fromAddress = event.params.from.toHexString();
  const toAddress = event.params.to.toHexString();
  const timestamp = event.block.timestamp;

  // Process each token in the batch
  for (let i = 0; i < event.params.ids.length; i++) {
    const tokenId = event.params.ids[i];
    const value = event.params.values[i];

    // Skip non-Yoki tokens
    if (tokenId.lt(NON_YOKI_BI)) {
      continue;
    }

    // Create entity for the transfer
    let entity = new TransferSingle(
      event.transaction.hash.concatI32(event.logIndex.toI32()).concatI32(i)
    );

    entity.operator = event.params.operator;
    entity.from = event.params.from;
    entity.to = event.params.to;
    entity.tokenId = tokenId;
    entity.value = value;
    entity.blockNumber = event.block.number;
    entity.blockTimestamp = timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();

    // Use helper function for each token in batch
    handleTokenTransfer(
      fromAddress,
      toAddress,
      tokenId,
      timestamp
    );
  }
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.value = event.params.value
  entity.tokenId = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}