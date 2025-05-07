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
import { TokenBalance } from "../generated/schema"

// Import all helpers from the new file
import {
  ZERO_ADDRESS,
  getActiveSeason,
  updateSeason7Condition,
  updateSeason8Condition,
  updateSeason9Condition,
  updateSeason10Condition
} from './season-helpers'

const ZERO_BI = BigInt.fromI32(0);
const NON_YOKI_BI = BigInt.fromI32(13);

// Convert string to Bytes for addresses
function addressToBytes(address: string): Bytes {
  return Bytes.fromHexString(address);
}

function updateTokenBalance(owner: string, tokenId: BigInt, value: BigInt, blockTimestamp: BigInt): void {
  const id = owner + "-" + tokenId.toString();
  let tokenBalance = TokenBalance.load(id);

  if (!tokenBalance) {
    tokenBalance = new TokenBalance(id);
    tokenBalance.owner = addressToBytes(owner);  // Convert string to Bytes
    tokenBalance.tokenId = tokenId;
    tokenBalance.balance = ZERO_BI;
  }

  tokenBalance.balance = tokenBalance.balance.plus(value);
  tokenBalance.lastUpdated = blockTimestamp;
  tokenBalance.save();
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

export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ids = event.params.ids
  entity.values = event.params.values

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
// Handle transfer single event
export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokenId = event.params.id
  if(entity.tokenId < NON_YOKI_BI) {
    return;
  }
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const fromAddress = event.params.from.toHexString();
  const toAddress = event.params.to.toHexString();
  const timestamp = event.block.timestamp;

  // Handle minting (from = 0x0)
  if (fromAddress == ZERO_ADDRESS) {
    updateTokenBalance(toAddress, event.params.id, event.params.value, timestamp);

    // Update conditions for all seasons
    const season = getActiveSeason(event.block.timestamp);
    if (season == 7) updateSeason7Condition(toAddress, event.block.timestamp);
    else if (season == 8) updateSeason8Condition(toAddress, event.block.timestamp);
    else if (season == 9) updateSeason9Condition(toAddress, event.block.timestamp);
    else if (season == 10) updateSeason10Condition(toAddress, event.block.timestamp);

  }
  // Handle burning (to = 0x0)
  else if (toAddress == ZERO_ADDRESS) {
    updateTokenBalance(fromAddress, event.params.id, event.params.value.neg(), timestamp);

    // Update conditions for all seasons
    const season = getActiveSeason(event.block.timestamp);
    if (season == 7) updateSeason7Condition(fromAddress, event.block.timestamp);
    else if (season == 8) updateSeason8Condition(fromAddress, event.block.timestamp);
    else if (season == 9) updateSeason9Condition(fromAddress, event.block.timestamp);
    else if (season == 10) updateSeason10Condition(fromAddress, event.block.timestamp);

  }
  // Handle transfers
  else {
    updateTokenBalance(fromAddress, event.params.id, event.params.value.neg(), timestamp);
    updateTokenBalance(toAddress, event.params.id, event.params.value, timestamp);

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