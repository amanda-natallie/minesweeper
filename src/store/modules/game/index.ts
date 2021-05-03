import { Reducer } from "redux";

import { GameTypes, GameState, TilesValue, TilesStatus } from "./types";

const INITIAL_STATE: GameState = {
  tiles: [],
  currentTile: {
    value: TilesValue.None,
    status: TilesStatus.Closed,
  },
  isGameStarted: false,
  bombCounter: 0,
  isGameOver: false,
  isGameWon: false,
};

const reducer: Reducer<GameState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GameTypes.SET_TILES:
      return {
        ...state,
        tiles: action.payload,
      };
    case GameTypes.SET_CURRENT_TILE:
      return {
        ...state,
        currentTile: action.payload,
      };
    case GameTypes.SET_GAME_STARTED:
      return {
        ...state,
        isGameStarted: action.payload,
      };
    case GameTypes.SET_BOMB_COUNTER:
      return {
        ...state,
        bombCounter: action.payload,
      };
    case GameTypes.SET_IS_GAME_OVER:
      return {
        ...state,
        isGameOver: action.payload,
      };
    case GameTypes.SET_IS_GAME_WON:
      return {
        ...state,
        isGameWon: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
