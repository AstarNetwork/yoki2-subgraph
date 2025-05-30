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
  import { BigInt, store, Bytes, Address } from "@graphprotocol/graph-ts"
  import { TokenBalance, Season7Condition } from "../generated/schema"

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  const ZERO_BI = BigInt.fromI32(0);
  const ONE_BI = BigInt.fromI32(1);
  const SEASON7_TOKENS = [
    BigInt.fromI32(100),
    BigInt.fromI32(101),
    BigInt.fromI32(200),
    BigInt.fromI32(201),
    BigInt.fromI32(300),
    BigInt.fromI32(301),
    BigInt.fromI32(400),
    BigInt.fromI32(401)
  ];

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

  function updateSeason7Condition(address: string, blockTimestamp: BigInt): void {
    // check cut off time for season 7
    const cutOffTime = BigInt.fromI32(1746104400); // Example cut-off time (in seconds)
    if (blockTimestamp.gt(cutOffTime)) {
      return;
    }

    const addressBytes = addressToBytes(address);  // Convert once and reuse
    let conditions = Season7Condition.load(addressBytes);

    if (!conditions) {
      conditions = new Season7Condition(addressBytes);
      conditions.address = addressBytes;
      conditions.hasAllRequiredTokens = false;
      conditions.token100Balance = ZERO_BI;
      conditions.token101Balance = ZERO_BI;
      conditions.token200Balance = ZERO_BI;
      conditions.token201Balance = ZERO_BI;
      conditions.token300Balance = ZERO_BI;
      conditions.token301Balance = ZERO_BI;
      conditions.token400Balance = ZERO_BI;
      conditions.token401Balance = ZERO_BI;
    }

    // Update token balances
    for (let i = 0; i < SEASON7_TOKENS.length; i++) {
      const tokenId = SEASON7_TOKENS[i];
      const balanceId = address + "-" + tokenId.toString();
      const tokenBalance = TokenBalance.load(balanceId);

      if (tokenId.equals(BigInt.fromI32(100))) {
        conditions.token100Balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
      } else if (tokenId.equals(BigInt.fromI32(101))) {
        conditions.token101Balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
      } else if (tokenId.equals(BigInt.fromI32(200))) {
        conditions.token200Balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
      } else if (tokenId.equals(BigInt.fromI32(201))) {
        conditions.token201Balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
      } else if (tokenId.equals(BigInt.fromI32(300))) {
        conditions.token300Balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
      } else if (tokenId.equals(BigInt.fromI32(301))) {
        conditions.token301Balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
      } else if (tokenId.equals(BigInt.fromI32(400))) {
        conditions.token400Balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
      } else if (tokenId.equals(BigInt.fromI32(401))) {
        conditions.token401Balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
      }
    }

    // Check if user has all required tokens
    conditions.hasAllRequiredTokens =
      conditions.token100Balance.gt(ZERO_BI) &&
      conditions.token101Balance.gt(ZERO_BI) &&
      conditions.token200Balance.gt(ZERO_BI) &&
      conditions.token201Balance.gt(ZERO_BI) &&
      conditions.token300Balance.gt(ZERO_BI) &&
      conditions.token301Balance.gt(ZERO_BI) &&
      conditions.token400Balance.gt(ZERO_BI) &&
      conditions.token401Balance.gt(ZERO_BI);

    conditions.lastUpdated = blockTimestamp;
    conditions.save();
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

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.id
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Track token balances only for Season 7 tokens
  if (SEASON7_TOKENS.includes(event.params.id)) {
    const fromAddress = event.params.from.toHexString();
    const toAddress = event.params.to.toHexString();
    const zeroAddress = ZERO_ADDRESS;

    // Handle minting (from = 0x0)
    if (fromAddress == zeroAddress) {
      updateTokenBalance(toAddress, event.params.id, event.params.value, event.block.timestamp);
      updateSeason7Condition(toAddress, event.block.timestamp);
    }
    // Handle burning (to = 0x0)
    else if (toAddress == zeroAddress) {
      updateTokenBalance(fromAddress, event.params.id, event.params.value.neg(), event.block.timestamp);
      updateSeason7Condition(fromAddress, event.block.timestamp);
    }
    // Handle transfers
    else {
      // We don't update the conditions here because we only care about mints
      // However, for completeness, we'll update token balances
      updateTokenBalance(fromAddress, event.params.id, event.params.value.neg(), event.block.timestamp);
      updateTokenBalance(toAddress, event.params.id, event.params.value, event.block.timestamp);
    }
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