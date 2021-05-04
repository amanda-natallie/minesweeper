export enum GameTypes {
  SET_TILES = "@game/SET_TILES",
  SET_CURRENT_TILE = "@game/SET_CURRENT_TILE",
  SET_GAME_STARTED = "@game/SET_GAME_STARTED",
  INCREMENT_FLAG_COUNT = "@game/INCREMENT_FLAG_COUNT",
  DECREMENT_FLAG_COUNT = "@game/DECREMENT_FLAG_COUNT",
  SET_IS_GAME_OVER = "@game/SET_IS_GAME_OVER",
  SET_IS_GAME_WON = "@game/SET_IS_GAME_WON",
  OPEN_TILES = "@game/OPEN_TILES",
  FLAG_TILE = "@game/FLAG_TILE",
  RESET_GAME = "@game/RESET_GAME",
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

export type TilesProps = {
  value: TilesValue;
};

export interface GameState {
  tiles: TilesProps[][];
  openedTiles: string[];
  isGameStarted: boolean;
  flagCount: number;
  isGameOver: boolean;
  isGameWon: boolean;
}
