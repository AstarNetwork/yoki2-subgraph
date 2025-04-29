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