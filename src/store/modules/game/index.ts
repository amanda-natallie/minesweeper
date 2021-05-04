import { Reducer } from "redux";
import { generateTiles } from "../../../helpers/tilesHelpers";

import { GameTypes, GameState } from "./types";

const INITIAL_STATE: GameState = {
  tiles: generateTiles(),
  openedTiles: [],
  isGameStarted: false,
  flagCount: 0,
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
    case GameTypes.INCREMENT_FLAG_COUNT:
      return {
        ...state,
        flagCount: state.flagCount + 1,
      };
    case GameTypes.DECREMENT_FLAG_COUNT:
      return {
        ...state,
        flagCount: state.flagCount - 1,
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
    case GameTypes.OPEN_TILES:
      const tilesToOpen = action.payload.filter(
        (tile: string) => !state.openedTiles.includes(tile)
      );

      if (!tilesToOpen.length) {
        return state;
      }

      return {
        ...state,
        openedTiles: [...state.openedTiles, ...tilesToOpen],
      };
    case GameTypes.RESET_GAME:
      return {
        ...INITIAL_STATE,
        tiles: state.tiles,
      };
    default:
      return state;
  }
};

export default reducer;
