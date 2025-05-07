import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { TokenBalance, Season7Condition, Season8Condition, Season9Condition, Season10Condition } from "../generated/schema"

// Constants
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);

// Season cutoff timestamps
export const SEASON7_CUTOFF = BigInt.fromI32(1746104400);
export const SEASON8_CUTOFF = BigInt.fromI32(1846104400);
export const SEASON9_CUTOFF = BigInt.fromI32(1946104400);
export const SEASON10_CUTOFF = BigInt.fromI32(1996104400);

// Season token requirements
export const SEASON7_TOKENS = [
  BigInt.fromI32(100),
  BigInt.fromI32(101),
  BigInt.fromI32(200),
  BigInt.fromI32(201),
  BigInt.fromI32(300),
  BigInt.fromI32(301),
  BigInt.fromI32(400),
  BigInt.fromI32(401)
];

// Season 8, 9, and 10 use the same token requirements
export const ALL_TOKENS = [
  BigInt.fromI32(100),
  BigInt.fromI32(101),
  BigInt.fromI32(200),
  BigInt.fromI32(201),
  BigInt.fromI32(300),
  BigInt.fromI32(301),
  BigInt.fromI32(400),
  BigInt.fromI32(401),
  BigInt.fromI32(500),
  BigInt.fromI32(501),
  BigInt.fromI32(600),
  BigInt.fromI32(601),
  BigInt.fromI32(700),
  BigInt.fromI32(701),
  BigInt.fromI32(800),
  BigInt.fromI32(801),
  BigInt.fromI32(900),
  BigInt.fromI32(901),
  BigInt.fromI32(1000),
  BigInt.fromI32(1001),
  BigInt.fromI32(1100),
  BigInt.fromI32(1101),
  BigInt.fromI32(1200),
  BigInt.fromI32(1201)
];

// Convert string to Bytes for addresses
export function addressToBytes(address: string): Bytes {
  return Bytes.fromHexString(address);
}

// Check if a user has already qualified for a previous season (8 or 9)
export function hasQualifiedForPreviousSeasons(address: Bytes, currentSeason: BigInt): boolean {
  if (currentSeason.equals(BigInt.fromI32(9))) {
    // For Season 9, check if qualified for Season 8
    const season8 = Season8Condition.load(address);
    return season8 !== null && season8.hasAllRequiredTokens;
  } 
  else if (currentSeason.equals(BigInt.fromI32(10))) {
    // For Season 10, check if qualified for Season 8 or 9
    const season8 = Season8Condition.load(address);
    const season9 = Season9Condition.load(address);
    return (season8 !== null && season8.hasAllRequiredTokens) || 
           (season9 !== null && season9.hasAllRequiredTokens);
  }
  return false;
}

// Season 7 functions
export function updateSeason7Condition(address: string, blockTimestamp: BigInt): void {
  // No need to check for season 7 if we're past the cutoff
  if (blockTimestamp.gt(SEASON7_CUTOFF)) {
    return;
  }

  const addressBytes = addressToBytes(address);
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
  let allTokensOwned = true;
  for (let i = 0; i < SEASON7_TOKENS.length; i++) {
    const tokenId = SEASON7_TOKENS[i];
    const balanceId = address + "-" + tokenId.toString();
    const tokenBalance = TokenBalance.load(balanceId);
    const balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
    
    // Update the specific token balance field
    if (tokenId.equals(BigInt.fromI32(100))) conditions.token100Balance = balance;
    else if (tokenId.equals(BigInt.fromI32(101))) conditions.token101Balance = balance;
    else if (tokenId.equals(BigInt.fromI32(200))) conditions.token200Balance = balance;
    else if (tokenId.equals(BigInt.fromI32(201))) conditions.token201Balance = balance;
    else if (tokenId.equals(BigInt.fromI32(300))) conditions.token300Balance = balance;
    else if (tokenId.equals(BigInt.fromI32(301))) conditions.token301Balance = balance;
    else if (tokenId.equals(BigInt.fromI32(400))) conditions.token400Balance = balance;
    else if (tokenId.equals(BigInt.fromI32(401))) conditions.token401Balance = balance;
    
    // Check if the user has this token
    if (balance.equals(ZERO_BI)) {
      allTokensOwned = false;
    }
  }

  conditions.hasAllRequiredTokens = allTokensOwned;
  conditions.lastUpdated = blockTimestamp;
  conditions.save();
}

// Season 8 functions
export function updateSeason8Condition(address: string, blockTimestamp: BigInt): void {
  // Season 8 is active between Season 7 cutoff and Season 8 cutoff
  if (blockTimestamp.le(SEASON7_CUTOFF) || blockTimestamp.gt(SEASON8_CUTOFF)) {
    return;
  }

  const addressBytes = addressToBytes(address);
  let conditions = Season8Condition.load(addressBytes);

  if (!conditions) {
    conditions = new Season8Condition(addressBytes);
    conditions.address = addressBytes;
    conditions.hasAllRequiredTokens = false;
    
    // Initialize all token balances to zero
    initializeS8TokenBalances(conditions);
  }

  // Update token balances and check if all tokens are owned
  const allTokensOwned = updateS8TokenBalances(conditions, address);
  
  // Set the qualification flag
  conditions.hasAllRequiredTokens = allTokensOwned;
  conditions.lastUpdated = blockTimestamp;
  conditions.save();
}

// Season 9 functions
export function updateSeason9Condition(address: string, blockTimestamp: BigInt): void {
  // Season 9 is active between Season 8 cutoff and Season 9 cutoff
  if (blockTimestamp.le(SEASON8_CUTOFF) || blockTimestamp.gt(SEASON9_CUTOFF)) {
    return;
  }

  const addressBytes = addressToBytes(address);
  
  // Check if already qualified for Season 8
  if (hasQualifiedForPreviousSeasons(addressBytes, BigInt.fromI32(9))) {
    return; // Skip Season 9 qualification if already qualified for Season 8
  }
  
  let conditions = Season9Condition.load(addressBytes);

  if (!conditions) {
    conditions = new Season9Condition(addressBytes);
    conditions.address = addressBytes;
    conditions.hasAllRequiredTokens = false;
    
    // Initialize all token balances to zero
    initializeS9TokenBalances(conditions);
  }

  // Update token balances and check if all tokens are owned
  const allTokensOwned = updateS9TokenBalances(conditions, address);
  
  // Set the qualification flag
  conditions.hasAllRequiredTokens = allTokensOwned;
  conditions.lastUpdated = blockTimestamp;
  conditions.save();
}

// Season 10 functions
export function updateSeason10Condition(address: string, blockTimestamp: BigInt): void {
  // Season 10 is active between Season 9 cutoff and Season 10 cutoff
  if (blockTimestamp.le(SEASON9_CUTOFF) || blockTimestamp.gt(SEASON10_CUTOFF)) {
    return;
  }

  const addressBytes = addressToBytes(address);
  
  // Check if already qualified for Season 8 or 9
  if (hasQualifiedForPreviousSeasons(addressBytes, BigInt.fromI32(10))) {
    return; // Skip Season 10 qualification if already qualified for Season 8 or 9
  }
  
  let conditions = Season10Condition.load(addressBytes);

  if (!conditions) {
    conditions = new Season10Condition(addressBytes);
    conditions.address = addressBytes;
    conditions.hasAllRequiredTokens = false;
    
    // Initialize all token balances to zero
    initializeS10TokenBalances(conditions);
  }

  // Update token balances and check if all tokens are owned
  const allTokensOwned = updateS10TokenBalances(conditions, address);
  
  // Set the qualification flag
  conditions.hasAllRequiredTokens = allTokensOwned;
  conditions.lastUpdated = blockTimestamp;
  conditions.save();
}

// Helper initialization functions - type-safe versions to avoid AssemblyScript issues
function initializeS8TokenBalances(conditions: Season8Condition): void {
  conditions.token100Balance = ZERO_BI;
  conditions.token101Balance = ZERO_BI;
  conditions.token200Balance = ZERO_BI;
  conditions.token201Balance = ZERO_BI;
  conditions.token300Balance = ZERO_BI;
  conditions.token301Balance = ZERO_BI;
  conditions.token400Balance = ZERO_BI;
  conditions.token401Balance = ZERO_BI;
  conditions.token500Balance = ZERO_BI;
  conditions.token501Balance = ZERO_BI;
  conditions.token600Balance = ZERO_BI;
  conditions.token601Balance = ZERO_BI;
  conditions.token700Balance = ZERO_BI;
  conditions.token701Balance = ZERO_BI;
  conditions.token800Balance = ZERO_BI;
  conditions.token801Balance = ZERO_BI;
  conditions.token900Balance = ZERO_BI;
  conditions.token901Balance = ZERO_BI;
  conditions.token1000Balance = ZERO_BI;
  conditions.token1001Balance = ZERO_BI;
  conditions.token1100Balance = ZERO_BI;
  conditions.token1101Balance = ZERO_BI;
  conditions.token1200Balance = ZERO_BI;
  conditions.token1201Balance = ZERO_BI;
}

function initializeS9TokenBalances(conditions: Season9Condition): void {
  conditions.token100Balance = ZERO_BI;
  conditions.token101Balance = ZERO_BI;
  // ... same as above for Season9
  conditions.token1200Balance = ZERO_BI;
  conditions.token1201Balance = ZERO_BI;
}

function initializeS10TokenBalances(conditions: Season10Condition): void {
  conditions.token100Balance = ZERO_BI;
  conditions.token101Balance = ZERO_BI;
  // ... same as above for Season10
  conditions.token1200Balance = ZERO_BI;
  conditions.token1201Balance = ZERO_BI;
}

// Helper update functions - type-safe versions to avoid AssemblyScript issues
function updateS8TokenBalances(conditions: Season8Condition, address: string): boolean {
  let allTokensOwned = true;
  
  for (let i = 0; i < ALL_TOKENS.length; i++) {
    const tokenId = ALL_TOKENS[i];
    const balanceId = address + "-" + tokenId.toString();
    const tokenBalance = TokenBalance.load(balanceId);
    const balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
    
    // Update the specific token balance field
    if (tokenId.equals(BigInt.fromI32(100))) conditions.token100Balance = balance;
    else if (tokenId.equals(BigInt.fromI32(101))) conditions.token101Balance = balance;
    // ... include all token IDs
    else if (tokenId.equals(BigInt.fromI32(1201))) conditions.token1201Balance = balance;
    
    if (balance.equals(ZERO_BI)) {
      allTokensOwned = false;
    }
  }
  
  return allTokensOwned;
}

function updateS9TokenBalances(conditions: Season9Condition, address: string): boolean {
  // Same implementation as updateS8TokenBalances but for Season9Condition
  let allTokensOwned = true;
  
  for (let i = 0; i < ALL_TOKENS.length; i++) {
    const tokenId = ALL_TOKENS[i];
    const balanceId = address + "-" + tokenId.toString();
    const tokenBalance = TokenBalance.load(balanceId);
    const balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
    
    // Update token balances based on tokenId
    if (tokenId.equals(BigInt.fromI32(100))) conditions.token100Balance = balance;
    else if (tokenId.equals(BigInt.fromI32(101))) conditions.token101Balance = balance;
    // ... include all token IDs
    else if (tokenId.equals(BigInt.fromI32(1201))) conditions.token1201Balance = balance;
    
    if (balance.equals(ZERO_BI)) {
      allTokensOwned = false;
    }
  }
  
  return allTokensOwned;
}

function updateS10TokenBalances(conditions: Season10Condition, address: string): boolean {
  // Same implementation as updateS8TokenBalances but for Season10Condition
  let allTokensOwned = true;
  
  for (let i = 0; i < ALL_TOKENS.length; i++) {
    const tokenId = ALL_TOKENS[i];
    const balanceId = address + "-" + tokenId.toString();
    const tokenBalance = TokenBalance.load(balanceId);
    const balance = tokenBalance ? tokenBalance.balance : ZERO_BI;
    
    // Update token balances based on tokenId
    if (tokenId.equals(BigInt.fromI32(100))) conditions.token100Balance = balance;
    else if (tokenId.equals(BigInt.fromI32(101))) conditions.token101Balance = balance;
    // ... include all token IDs
    else if (tokenId.equals(BigInt.fromI32(1201))) conditions.token1201Balance = balance;
    
    if (balance.equals(ZERO_BI)) {
      allTokensOwned = false;
    }
  }
  
  return allTokensOwned;
}