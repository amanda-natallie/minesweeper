export enum GameTypes {
  SET_TILES = "@game/SET_TILES",
  SET_CURRENT_TILE = "@game/SET_CURRENT_TILE",
  SET_GAME_STARTED = "@game/SET_GAME_STARTED",
  SET_BOMB_COUNTER = "@game/SET_BOMB_COUNTER",
  SET_IS_GAME_OVER = "@game/SET_IS_GAME_OVER",
  SET_IS_GAME_WON = "@game/SET_IS_GAME_WON",
}

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

export interface GameState {
  tiles: TilesProps[][];
  currentTile: TilesProps;
  isGameStarted: boolean;
  bombCounter: number;
  isGameOver: boolean;
  isGameWon: boolean;
}
