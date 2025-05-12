import { TransferSingle as TransferSingleEvent } from "../generated/YokiImplAtProxy/YokiImpl"  // Updated import path
import { TransferSingle, YokiPerSeason } from "../generated/schema"
import { BigInt, store, Bytes, Address } from "@graphprotocol/graph-ts"
import { Season, getSeason } from "./seasons"
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_BI = BigInt.fromI32(0);
const ONE_BI = BigInt.fromI32(1);

const YOKIS_COUNT = 24;

function getYokiIndex(yokiId: i32): i32 {
  return ((Math.floor(yokiId / 100) as i32) - 1) * 2 + (yokiId % 100);
}
export const hasAllYokis = (ownedYokis: i32[]): boolean =>
  ownedYokis.filter((x) => x === 0).length === 0;

const getAggregateKey = (address: string, seasonId: i32): string =>
  `${address}_${seasonId}`;

const createYokiPerSeason = (
  address: string,
  season: Season
): YokiPerSeason => {
  const id = getAggregateKey(address, season.id);
  const yokiPerSeason = new YokiPerSeason(id);
  yokiPerSeason.address = address;
  yokiPerSeason.season = season.id;
  yokiPerSeason.ownedYokis = new Array<i32>(YOKIS_COUNT).fill(0);
  yokiPerSeason.hasAll = false;
  return yokiPerSeason;
};

const getYokiEntry = (
  address: string,
  season: Season
): YokiPerSeason => {
  const key = getAggregateKey(address, season.id);
  let yokiPerSeason = YokiPerSeason.load(key);
  if (!yokiPerSeason) {
    yokiPerSeason = createYokiPerSeason(address, season);
  }

  return yokiPerSeason;
};

export const handleYokiPerSeason = (
  from: Bytes,
  to: Bytes,
  yokiId: i32,
  value: BigInt,
  blockNumber: BigInt
): void => {
  const yokiIndex = getYokiIndex(yokiId);
  const valueNumber = value.toI32();
  const season = getSeason(blockNumber.toI32());
  const toStr = to.toHexString();
  const fromStr = from.toHexString();

  // If the current season is not valid, we can skip this event
  if (season.id == 0) {
    return;
  }

  let yokiPerSeason: YokiPerSeason | null = null;

  if (fromStr != ZERO_ADDRESS) {
    yokiPerSeason = getYokiEntry(fromStr, season);
    let currentValue = yokiPerSeason.ownedYokis[yokiIndex];
    yokiPerSeason.ownedYokis[yokiIndex] = currentValue - valueNumber;
    yokiPerSeason.hasAll = hasAllYokis(yokiPerSeason.ownedYokis);
    yokiPerSeason.save();
  }
  
  if (toStr != ZERO_ADDRESS) {
    yokiPerSeason = getYokiEntry(toStr, season);
    let currentValue = yokiPerSeason.ownedYokis[yokiIndex];
    yokiPerSeason.ownedYokis[yokiIndex] = currentValue + valueNumber;
    yokiPerSeason.hasAll = hasAllYokis(yokiPerSeason.ownedYokis);
    yokiPerSeason.save();
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

  // Get current season and store it in the entity
  const currentSeason = getSeason(event.block.timestamp.toI32());
  if (currentSeason.id == 0) {
    // If the current season is not valid, we can skip this event
    return;
  }
  entity.season = currentSeason.id;
  entity.save()

  const tokenId = event.params.id.toI32();
  if (tokenId < 100) {
    // We don't care about omas and capsules.
    return;
  }

  // Handle the yoki collection
  handleYokiPerSeason(
    event.params.from,
    event.params.to,
    tokenId,
    event.params.value,
    event.block.number);
  
}
