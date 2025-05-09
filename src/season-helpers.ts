import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { AddressTokens, Season7Condition, Season8Condition, Season9Condition, Season10Condition } from "../generated/schema"

// Constants
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);

// Season cutoff timestamps
export const SEASON7_CUTOFF = BigInt.fromI32(1746104400);
export const SEASON8_CUTOFF = BigInt.fromI32(1746968400); // Sunday, May 11, 2025 1:00:00 PM
export const SEASON9_CUTOFF = BigInt.fromI32(1747832400); // Wednesday, May 21, 2025 1:00:00 PM
export const SEASON10_CUTOFF = BigInt.fromI32(1748610000); // May 30, 2025 1:00:00 PM

// Constants for token IDs as BigInt - compute once and reuse
export const TOKEN_100 = 100;
export const TOKEN_101 = 101;
export const TOKEN_200 = 200;
export const TOKEN_201 = 201;
export const TOKEN_300 = 300;
export const TOKEN_301 = 301;
export const TOKEN_400 = 400;
export const TOKEN_401 = 401;
export const TOKEN_500 = 500;
export const TOKEN_501 = 501;
export const TOKEN_600 = 600;
export const TOKEN_601 = 601;
export const TOKEN_700 = 700;
export const TOKEN_701 = 701;
export const TOKEN_800 = 800;
export const TOKEN_801 = 801;
export const TOKEN_900 = 900;
export const TOKEN_901 = 901;
export const TOKEN_1000 = 1000;
export const TOKEN_1001 = 1001;
export const TOKEN_1100 = 1100;
export const TOKEN_1101 = 1101;
export const TOKEN_1200 = 1200;
export const TOKEN_1201 = 1201;

// Season token requirements
export const SEASON7_TOKENS = [
	TOKEN_100, TOKEN_101,
	TOKEN_200, TOKEN_201,
	TOKEN_300, TOKEN_301,
	TOKEN_400, TOKEN_401
];

// Season 8, 9, and 10 use the same token requirements
export const ALL_TOKENS = [
	TOKEN_100, TOKEN_101,
	TOKEN_200, TOKEN_201,
	TOKEN_300, TOKEN_301,
	TOKEN_400, TOKEN_401,
	TOKEN_500, TOKEN_501,
	TOKEN_600, TOKEN_601,
	TOKEN_700, TOKEN_701,
	TOKEN_800, TOKEN_801,
	TOKEN_900, TOKEN_901,
	TOKEN_1000, TOKEN_1001,
	TOKEN_1100, TOKEN_1101,
	TOKEN_1200, TOKEN_1201
];

// Convert string to Bytes for addresses
export function addressToBytes(address: string): Bytes {
	return Bytes.fromHexString(address);
}

export function getActiveSeason(timestamp: BigInt): number {
	if (timestamp.le(SEASON7_CUTOFF)) return 7;
	if (timestamp.le(SEASON8_CUTOFF)) return 8;
	if (timestamp.le(SEASON9_CUTOFF)) return 9;
	if (timestamp.le(SEASON10_CUTOFF)) return 10;
	return 0; // No active season
}

// Check if a user has already qualified for a previous season (8 or 9)
export function hasQualifiedForPreviousSeasons(address: Bytes, currentSeason: i32): boolean {
	if (currentSeason == 9) {
		// For Season 9, check if qualified for Season 8
		const season8 = Season8Condition.load(address);
		return season8 !== null && season8.hasAllRequiredTokens;
	}
	else if (currentSeason == 10) {
		// For Season 10, check if qualified for Season 8 or 9
		const season8 = Season8Condition.load(address);
		const season9 = Season9Condition.load(address);
		return (season8 !== null && season8.hasAllRequiredTokens) ||
			(season9 !== null && season9.hasAllRequiredTokens);
	}
	return false;
}

// Check if address already has a condition entity for Season7
export function addressHasExistingCondition7(address: Bytes): boolean {
	const seasonCondition = Season7Condition.load(address);
	return seasonCondition !== null;
}

// Check if address already has a condition entity for Season8
export function addressHasExistingCondition8(address: Bytes): boolean {
	const seasonCondition = Season8Condition.load(address);
	return seasonCondition !== null;
}

// Check if address already has a condition entity for Season9
export function addressHasExistingCondition9(address: Bytes): boolean {
	const seasonCondition = Season9Condition.load(address);
	return seasonCondition !== null;
}

// Check if address already has a condition entity for Season10
export function addressHasExistingCondition10(address: Bytes): boolean {
	const seasonCondition = Season10Condition.load(address);
	return seasonCondition !== null;
}

// Season 7 functions
export function updateSeason7Condition(address: string, blockTimestamp: BigInt): void {
	const addressBytes = addressToBytes(address);
	const addressTokens = AddressTokens.load(addressBytes);
	
	// Skip processing if there are no tokens for this address
	if (!addressTokens) return;
	
	// Check if all required tokens are owned
	let allTokensOwned = true;
	for (let i = 0; i < SEASON7_TOKENS.length; i++) {
	  if (!addressTokens.ownedTokens.includes(SEASON7_TOKENS[i])) {
		allTokensOwned = false;
		break;
	  }
	}
	
	// Only proceed if tokens are owned or entity already exists
	let conditions = Season7Condition.load(addressBytes);
	
	// User qualifies and entity doesn't exist -> Create new entity with true
	if (allTokensOwned && conditions === null) {
	  conditions = new Season7Condition(addressBytes);
	  conditions.hasAllRequiredTokens = true;
	  conditions.lastUpdated = blockTimestamp;
	  conditions.save();
	  return;
	}
}

// Season 8 functions
export function updateSeason8Condition(address: string, blockTimestamp: BigInt): void {
  const addressBytes = addressToBytes(address);
  const addressTokens = AddressTokens.load(addressBytes);
  
  // Skip processing if there are no tokens for this address
  if (!addressTokens) return;
  
  // Check if all required tokens are owned
  let allTokensOwned = true;
  for (let i = 0; i < ALL_TOKENS.length; i++) {
    if (!addressTokens.ownedTokens.includes(ALL_TOKENS[i])) {
      allTokensOwned = false;
      break;
    }
  }
  
  // Only proceed if tokens are owned or entity already exists
  let conditions = Season8Condition.load(addressBytes);
  
  // User qualifies and entity doesn't exist -> Create new entity with true
  if (allTokensOwned && conditions === null) {
    conditions = new Season8Condition(addressBytes);
    conditions.hasAllRequiredTokens = true;
    conditions.lastUpdated = blockTimestamp;
    conditions.save();
    return;
  }
}

// Season 9 functions
export function updateSeason9Condition(address: string, blockTimestamp: BigInt): void {
	const addressBytes = addressToBytes(address);
	const addressTokens = AddressTokens.load(addressBytes);
	
	// Skip processing if there are no tokens for this address
	if (!addressTokens) return;
	
	// Check if all required tokens are owned
	let allTokensOwned = true;
	for (let i = 0; i < ALL_TOKENS.length; i++) {
	  if (!addressTokens.ownedTokens.includes(ALL_TOKENS[i])) {
		allTokensOwned = false;
		break;
	  }
	}
	
	// Only proceed if tokens are owned or entity already exists
	let conditions = Season9Condition.load(addressBytes);
	
	// User qualifies and entity doesn't exist -> Create new entity with true
	if (allTokensOwned && conditions === null) {
	  conditions = new Season9Condition(addressBytes);
	  conditions.hasAllRequiredTokens = true;
	  conditions.lastUpdated = blockTimestamp;
	  conditions.save();
	  return;
	}
  }

// Season 10 functions
export function updateSeason10Condition(address: string, blockTimestamp: BigInt): void {
	const addressBytes = addressToBytes(address);
	const addressTokens = AddressTokens.load(addressBytes);
	
	// Skip processing if there are no tokens for this address
	if (!addressTokens) return;
	
	// Check if all required tokens are owned
	let allTokensOwned = true;
	for (let i = 0; i < ALL_TOKENS.length; i++) {
	  if (!addressTokens.ownedTokens.includes(ALL_TOKENS[i])) {
		allTokensOwned = false;
		break;
	  }
	}
	
	// Only proceed if tokens are owned or entity already exists
	let conditions = Season10Condition.load(addressBytes);
	
	// User qualifies and entity doesn't exist -> Create new entity with true
	if (allTokensOwned && conditions === null) {
	  conditions = new Season10Condition(addressBytes);
	  conditions.hasAllRequiredTokens = true;
	  conditions.lastUpdated = blockTimestamp;
	  conditions.save();
	  return;
	}
  }