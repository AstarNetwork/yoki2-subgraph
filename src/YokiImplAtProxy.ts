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
  } from "../generated/YokiImplAtProxy/YokiImpl"
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
    TokenBalance,
    Season7Condition
  } from "../generated/schema"
  import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"

  // Array of required token IDs
  const REQUIRED_TOKEN_IDS: BigInt[] = [
    BigInt.fromI32(100),
    BigInt.fromI32(101),
    BigInt.fromI32(200),
    BigInt.fromI32(201),
    BigInt.fromI32(300),
    BigInt.fromI32(301),
    BigInt.fromI32(400),
    BigInt.fromI32(401)
  ]

  // Helper function to check if a token ID is in the required list
  function isSeason7Token(tokenId: BigInt): boolean {
    for (let i = 0; i < REQUIRED_TOKEN_IDS.length; i++) {
      if (tokenId.equals(REQUIRED_TOKEN_IDS[i])) {
        return true
      }
    }
    return false
  }

  // Helper function to update token balance
  function updateTokenBalance(owner: Bytes, tokenId: BigInt, amount: BigInt, timestamp: BigInt): void {
    const id = owner.toHexString() + "-" + tokenId.toString()
    let balance = TokenBalance.load(id)

    if (balance == null) {
      balance = new TokenBalance(id)
      balance.owner = owner
      balance.tokenId = tokenId
      balance.balance = BigInt.fromI32(0)
    }

    balance.balance = balance.balance.plus(amount)
    balance.lastUpdated = timestamp
    balance.save()

    // If this is a required token for season7, update the season7 condition
    if (isSeason7Token(tokenId)) {
      updateSeason7Condition(owner, timestamp)
    }
  }

  // Helper function to update the season7 condition entity
  function updateSeason7Condition(address: Bytes, timestamp: BigInt): void {
    const id = address.toHexString()
    let condition = Season7Condition.load(id)

    if (condition == null) {
      condition = new Season7Condition(id)
      condition.address = address
      condition.hasAllRequiredTokens = false
      condition.token100Balance = BigInt.fromI32(0)
      condition.token101Balance = BigInt.fromI32(0)
      condition.token200Balance = BigInt.fromI32(0)
      condition.token201Balance = BigInt.fromI32(0)
      condition.token300Balance = BigInt.fromI32(0)
      condition.token301Balance = BigInt.fromI32(0)
      condition.token400Balance = BigInt.fromI32(0)
      condition.token401Balance = BigInt.fromI32(0)
    }

    // Update token balances
    const balanceIds = [
      address.toHexString() + "-100",
      address.toHexString() + "-101",
      address.toHexString() + "-200",
      address.toHexString() + "-201",
      address.toHexString() + "-300",
      address.toHexString() + "-301",
      address.toHexString() + "-400",
      address.toHexString() + "-401"
    ]

    const balance100 = TokenBalance.load(balanceIds[0])
    const balance101 = TokenBalance.load(balanceIds[1])
    const balance200 = TokenBalance.load(balanceIds[2])
    const balance201 = TokenBalance.load(balanceIds[3])
    const balance300 = TokenBalance.load(balanceIds[4])
    const balance301 = TokenBalance.load(balanceIds[5])
    const balance400 = TokenBalance.load(balanceIds[6])
    const balance401 = TokenBalance.load(balanceIds[7])

    condition.token100Balance = balance100 ? balance100.balance : BigInt.fromI32(0)
    condition.token101Balance = balance101 ? balance101.balance : BigInt.fromI32(0)
    condition.token200Balance = balance200 ? balance200.balance : BigInt.fromI32(0)
    condition.token201Balance = balance201 ? balance201.balance : BigInt.fromI32(0)
    condition.token300Balance = balance300 ? balance300.balance : BigInt.fromI32(0)
    condition.token301Balance = balance301 ? balance301.balance : BigInt.fromI32(0)
    condition.token400Balance = balance400 ? balance400.balance : BigInt.fromI32(0)
    condition.token401Balance = balance401 ? balance401.balance : BigInt.fromI32(0)

    // Check if all required tokens are present with at least 1 balance
    condition.hasAllRequiredTokens =
      condition.token100Balance.gt(BigInt.fromI32(0)) &&
      condition.token101Balance.gt(BigInt.fromI32(0)) &&
      condition.token200Balance.gt(BigInt.fromI32(0)) &&
      condition.token201Balance.gt(BigInt.fromI32(0)) &&
      condition.token300Balance.gt(BigInt.fromI32(0)) &&
      condition.token301Balance.gt(BigInt.fromI32(0)) &&
      condition.token400Balance.gt(BigInt.fromI32(0)) &&
      condition.token401Balance.gt(BigInt.fromI32(0))

    condition.lastUpdated = timestamp
    condition.save()
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

    // Update token balances for batch transfers
    for (let i = 0; i < event.params.ids.length; i++) {
      const tokenId = event.params.ids[i]
      const value = event.params.values[i]

      // Update balance for sender (decrease)
      if (!event.params.from.equals(Address.zero())) {
        updateTokenBalance(
          event.params.from,
          tokenId,
          value.neg(), // Negative amount for sending
          event.block.timestamp
        )
      }

      // Update balance for receiver (increase)
      if (!event.params.to.equals(Address.zero())) {
        updateTokenBalance(
          event.params.to,
          tokenId,
          value, // Positive amount for receiving
          event.block.timestamp
        )
      }
    }
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

    // Update token balances for this transfer
    const tokenId = event.params.id
    const value = event.params.value

    // Update balance for sender (decrease)
    if (!event.params.from.equals(Address.zero())) {
      updateTokenBalance(
        event.params.from,
        tokenId,
        value.neg(), // Negative amount for sending
        event.block.timestamp
      )
    }

    // Update balance for receiver (increase)
    if (!event.params.to.equals(Address.zero())) {
      updateTokenBalance(
        event.params.to,
        tokenId,
        value, // Positive amount for receiving
        event.block.timestamp
      )
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