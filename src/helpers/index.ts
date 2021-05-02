import { MAX_COLUMNS, MAX_ROWS } from "../constants";
import { TilesProps, TilesStatus, TilesValue } from "../types";

export const generateTiles = () => {
  const tiles: TilesProps[][] = [];
  for (let r = 0; r < MAX_ROWS; r++) {
    tiles.push([]);
    for (let c = 0; c < MAX_COLUMNS; c++) {
      tiles[r].push({
        value: TilesValue.None,
        status: TilesStatus.Opened,
      });
    }
  }

  return tiles;
};
