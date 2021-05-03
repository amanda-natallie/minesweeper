import { action } from "typesafe-actions";

import { GameTypes } from "./types";

export const setTiles = (tiles: GameTypes): any =>
  action(GameTypes.SET_TILES, tiles);

export const setCurrentTile = (tile: GameTypes): any =>
  action(GameTypes.SET_CURRENT_TILE, tile);

export const setGameStarted = (status: GameTypes): any =>
  action(GameTypes.SET_GAME_STARTED, status);

export const setBombCounter = (bombs: GameTypes): any =>
  action(GameTypes.SET_BOMB_COUNTER, bombs);

export const setIsGameOver = (status: GameTypes): any =>
  action(GameTypes.SET_IS_GAME_OVER, status);

export const setIsGameWon = (status: GameTypes): any =>
  action(GameTypes.SET_IS_GAME_WON, status);
