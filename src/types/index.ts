export enum TilesValue {
  None = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 4,
  Six = 5,
  Seven = 6,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Eleven = 11,
  Twelve = 12,
  Thirteen = 13,
  Fourteen = 14,
  Fifhteen = 15,
  Sixteen = 16,
  Bomb = 17,
}

export enum TilesStatus {
  Opened,
  Visible,
  Flagged,
}

export interface TilesProps {
  value: TilesValue;
  status: TilesStatus;
}
