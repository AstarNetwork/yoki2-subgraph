export class Season {
  id: i32;
  cutoff: i64;

  constructor(id: i32, cutoff: i64) {
    this.id = id;
    this.cutoff = cutoff;
  }
}

export const SEASONS: Season[] = [
  // new Season(7, 1746104400000 as i64),
  new Season(8, 1746968400000 as i64), // Sunday, May 11, 2025 1:00:00 PM
  new Season(9, 1747832400000 as i64), // Wednesday, May 21, 2025 1:00:00 PM
  new Season(10, 1748610000000 as i64), // May 30, 2025 1:00:00 PM
];

export function getSeason(timestamp: i64): Season {
  let season: Season | null = null;

  // Loop through seasons to find first one with cutoff after timestamp
  for (let i = 0; i < SEASONS.length; i++) {
    if (SEASONS[i].cutoff > timestamp) {
      season = SEASONS[i];
      break;
    }
  }
  
  // If no season found (timestamp is after all cutoffs)
  if (season === null) {
    return new Season(0, 0);
  }
  
  return season;
}