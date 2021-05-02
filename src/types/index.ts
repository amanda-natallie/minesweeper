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
  Bomb = 9,
}

export enum TilesStatus {
  Opened,
  Visible,
  Flagged,
}

export type TilesProps = {
  value: TilesValue;
  status: TilesStatus;
};
