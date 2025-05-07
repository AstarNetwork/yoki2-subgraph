import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { AddressTokens, Season7Condition, Season8Condition, Season9Condition, Season10Condition } from "../generated/schema"

// Constants
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);

// Season cutoff timestamps
export const SEASON7_CUTOFF = BigInt.fromI32(1746104400);
export const SEASON8_CUTOFF = BigInt.fromI32(1746190800); // test time. Real time is 1746968400
export const SEASON9_CUTOFF = BigInt.fromI32(1746277200); // test time
export const SEASON10_CUTOFF = BigInt.fromI32(1746536400); // test time

// Constants for token IDs as BigInt - compute once and reuse
export const TOKEN_100 = BigInt.fromI32(100);
export const TOKEN_101 = BigInt.fromI32(101);
export const TOKEN_200 = BigInt.fromI32(200);
export const TOKEN_201 = BigInt.fromI32(201);
export const TOKEN_300 = BigInt.fromI32(300);
export const TOKEN_301 = BigInt.fromI32(301);
export const TOKEN_400 = BigInt.fromI32(400);
export const TOKEN_401 = BigInt.fromI32(401);
export const TOKEN_500 = BigInt.fromI32(500);
export const TOKEN_501 = BigInt.fromI32(501);
export const TOKEN_600 = BigInt.fromI32(600);
export const TOKEN_601 = BigInt.fromI32(601);
export const TOKEN_700 = BigInt.fromI32(700);
export const TOKEN_701 = BigInt.fromI32(701);
export const TOKEN_800 = BigInt.fromI32(800);
export const TOKEN_801 = BigInt.fromI32(801);
export const TOKEN_900 = BigInt.fromI32(900);
export const TOKEN_901 = BigInt.fromI32(901);
export const TOKEN_1000 = BigInt.fromI32(1000);
export const TOKEN_1001 = BigInt.fromI32(1001);
export const TOKEN_1100 = BigInt.fromI32(1100);
export const TOKEN_1101 = BigInt.fromI32(1101);
export const TOKEN_1200 = BigInt.fromI32(1200);
export const TOKEN_1201 = BigInt.fromI32(1201);

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

	if (!addressTokens) return;

	// Check if all required tokens are owned
	let allTokensOwned = true;
	for (let i = 0; i < SEASON7_TOKENS.length; i++) {
		if (!addressTokens.ownedTokens.includes(SEASON7_TOKENS[i])) {
			allTokensOwned = false;
			break;
		}
	}

	// Only create/update condition if tokens are owned or entity already exists
	if (allTokensOwned || addressHasExistingCondition7(addressBytes)) {
		let conditions = Season7Condition.load(addressBytes);
		if (!conditions) {
			conditions = new Season7Condition(addressBytes);
			conditions.address = addressBytes;
		}

		conditions.hasAllRequiredTokens = allTokensOwned;
		conditions.lastUpdated = blockTimestamp;
		conditions.save();
	}
}

// Season 8 functions
export function updateSeason8Condition(address: string, blockTimestamp: BigInt): void {
	const addressBytes = addressToBytes(address);
	const addressTokens = AddressTokens.load(addressBytes);

	if (!addressTokens) return;

	// Check if all required tokens are owned
	let allTokensOwned = true;
	for (let i = 0; i < ALL_TOKENS.length; i++) {
		if (!addressTokens.ownedTokens.includes(ALL_TOKENS[i])) {
			allTokensOwned = false;
			break;
		}
	}

	// Only create/update condition if tokens are owned or entity already exists
	if (allTokensOwned || addressHasExistingCondition8(addressBytes)) {
		let conditions = Season8Condition.load(addressBytes);
		if (!conditions) {
			conditions = new Season8Condition(addressBytes);
			conditions.address = addressBytes;
		}

		conditions.hasAllRequiredTokens = allTokensOwned;
		conditions.lastUpdated = blockTimestamp;
		conditions.save();
	}
}

// Season 9 functions
export function updateSeason9Condition(address: string, blockTimestamp: BigInt): void {
	const addressBytes = addressToBytes(address);
	const addressTokens = AddressTokens.load(addressBytes);

	if (!addressTokens) return;

	// Check if all required tokens are owned
	let allTokensOwned = true;
	for (let i = 0; i < ALL_TOKENS.length; i++) {
		if (!addressTokens.ownedTokens.includes(ALL_TOKENS[i])) {
			allTokensOwned = false;
			break;
		}
	}

	// Only create/update condition if tokens are owned or entity already exists
	if (allTokensOwned || addressHasExistingCondition9(addressBytes)) {
		let conditions = Season9Condition.load(addressBytes);
		if (!conditions) {
			conditions = new Season9Condition(addressBytes);
			conditions.address = addressBytes;
		}

		conditions.hasAllRequiredTokens = allTokensOwned;
		conditions.lastUpdated = blockTimestamp;
		conditions.save();
	}
}

// Season 10 functions
export function updateSeason10Condition(address: string, blockTimestamp: BigInt): void {
	const addressBytes = addressToBytes(address);
	const addressTokens = AddressTokens.load(addressBytes);

	if (!addressTokens) return;

	// Check if all required tokens are owned
	let allTokensOwned = true;
	for (let i = 0; i < ALL_TOKENS.length; i++) {
		if (!addressTokens.ownedTokens.includes(ALL_TOKENS[i])) {
			allTokensOwned = false;
			break;
		}
	}

	// Only create/update condition if tokens are owned or entity already exists
	if (allTokensOwned || addressHasExistingCondition10(addressBytes)) {
		let conditions = Season10Condition.load(addressBytes);
		if (!conditions) {
			conditions = new Season10Condition(addressBytes);
			conditions.address = addressBytes;
		}

		conditions.hasAllRequiredTokens = allTokensOwned;
		conditions.lastUpdated = blockTimestamp;
		conditions.save();
	}
}