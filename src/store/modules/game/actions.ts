import { action } from "typesafe-actions";

import { GameTypes, TilesProps } from "./types";

export const setTiles = (tiles: TilesProps[][]): any =>
  action(GameTypes.SET_TILES, tiles);

export const setCurrentTile = (tile: TilesProps): any =>
  action(GameTypes.SET_CURRENT_TILE, tile);

export const setGameStarted = (status: boolean): any =>
  action(GameTypes.SET_GAME_STARTED, status);

export const incrementFlagCount = (): any =>
  action(GameTypes.INCREMENT_FLAG_COUNT);

export const decrementFlagCount = (): any =>
  action(GameTypes.DECREMENT_FLAG_COUNT);

export const setIsGameOver = (status: boolean): any =>
  action(GameTypes.SET_IS_GAME_OVER, status);

export const setIsGameWon = (status: boolean): any =>
  action(GameTypes.SET_IS_GAME_WON, status);

export const openTiles = (tiles: string[]): any =>
  action(GameTypes.OPEN_TILES, tiles);

export const flagTile = (tile: string): any =>
  action(GameTypes.FLAG_TILE, tile);

export const resetGame = (): any => action(GameTypes.RESET_GAME);
