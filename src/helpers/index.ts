import { MAX_COLUMNS, MAX_ROWS, NUMBER_OF_BOMBS } from "../constants";
import { TilesProps, TilesStatus, TilesValue } from "../types";

export const generateTiles = (): TilesProps[][] => {
  let tiles: TilesProps[][] = [];

  /** generating tiles */
  for (let r = 0; r < MAX_ROWS; r++) {
    tiles.push([]);
    for (let c = 0; c < MAX_COLUMNS; c++) {
      tiles[r].push({
        value: TilesValue.None,
        status: TilesStatus.Visible,
      });
    }
  }

  /** randomly generate bombs */
  let placedBombs = 0;

  while (placedBombs < NUMBER_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS);
    const randomColumn = Math.floor(Math.random() * MAX_COLUMNS);

    let currentTile = tiles[randomRow][randomColumn];

    if (currentTile.value !== TilesValue.Bomb) {
      tiles = tiles.map((row, rowIndex) =>
        row.map((column, columnIndex) => {
          if (columnIndex === randomColumn && rowIndex === randomRow) {
            return {
              ...column,
              value: TilesValue.Bomb,
            };
          }

          return column;
        })
      );
      placedBombs++;
    }
  }

  return tiles;
};
