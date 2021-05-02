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

  //showing bombs for each tile

  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let columnIndex = 0; columnIndex < MAX_COLUMNS; columnIndex++) {
      const currentTile = tiles[rowIndex][columnIndex];

      if (currentTile.value !== TilesValue.Bomb) {
        let numberOfBombs = 0;

        const topLeftBomb =
          rowIndex > 0 && columnIndex > 0
            ? tiles[rowIndex - 1][columnIndex - 1]
            : null;

        const topBomb = rowIndex > 0 ? tiles[rowIndex - 1][columnIndex] : null;
        const topRightBomb =
          rowIndex > 0 && columnIndex < MAX_COLUMNS - 1
            ? tiles[rowIndex - 1][columnIndex + 1]
            : null;
        const leftBomb =
          columnIndex > 0 ? tiles[rowIndex][columnIndex - 1] : null;
        const rightBomb =
          columnIndex < MAX_COLUMNS - 1
            ? tiles[rowIndex][columnIndex + 1]
            : null;

        const bottomLeftBomb =
          rowIndex < MAX_ROWS - 1 && columnIndex > 0
            ? tiles[rowIndex + 1][columnIndex - 1]
            : null;
        const bottomBomb =
          rowIndex < MAX_ROWS - 1 ? tiles[rowIndex + 1][columnIndex] : null;
        const BottomRightBomb =
          rowIndex < MAX_ROWS - 1 && columnIndex < MAX_COLUMNS - 1
            ? tiles[rowIndex + 1][columnIndex + 1]
            : null;

        topLeftBomb?.value === TilesValue.Bomb && numberOfBombs++;
        topBomb?.value === TilesValue.Bomb && numberOfBombs++;
        topRightBomb?.value === TilesValue.Bomb && numberOfBombs++;
        leftBomb?.value === TilesValue.Bomb && numberOfBombs++;
        rightBomb?.value === TilesValue.Bomb && numberOfBombs++;
        bottomLeftBomb?.value === TilesValue.Bomb && numberOfBombs++;
        bottomBomb?.value === TilesValue.Bomb && numberOfBombs++;
        BottomRightBomb?.value === TilesValue.Bomb && numberOfBombs++;

        if (numberOfBombs > 0) {
          tiles[rowIndex][columnIndex] = {
            ...currentTile,
            value: numberOfBombs,
          };
        }
      }
    }
  }

  return tiles;
};
