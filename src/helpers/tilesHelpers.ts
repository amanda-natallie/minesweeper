import { MAX_COLUMNS, MAX_ROWS, NUMBER_OF_BOMBS } from "../constants";
import {
  TilesProps,
  TilesValue,
  TilesStatus,
} from "../store/modules/game/types";

const gatherAdjacentTiles = (
  tiles: TilesProps[][],
  row: number,
  column: number
): {
  topLeftTiles?: TilesProps;
  topTiles?: TilesProps;
  topRightTiles?: TilesProps;
  leftTiles?: TilesProps;
  rightTiles?: TilesProps;
  bottomLeftTiles?: TilesProps;
  BottomRightTiles?: TilesProps;
  bottomTiles?: TilesProps;
} => {
  return {
    topLeftTiles:
      row > 0 && column > 0 ? tiles[row - 1][column - 1] : undefined,

    topTiles: row > 0 ? tiles[row - 1][column] : undefined,
    topRightTiles:
      row > 0 && column < MAX_COLUMNS - 1
        ? tiles[row - 1][column + 1]
        : undefined,
    leftTiles: column > 0 ? tiles[row][column - 1] : undefined,
    rightTiles: column < MAX_COLUMNS - 1 ? tiles[row][column + 1] : undefined,

    bottomLeftTiles:
      row < MAX_ROWS - 1 && column > 0 ? tiles[row + 1][column - 1] : undefined,
    bottomTiles: row < MAX_ROWS - 1 ? tiles[row + 1][column] : undefined,
    BottomRightTiles:
      row < MAX_ROWS - 1 && column < MAX_COLUMNS - 1
        ? tiles[row + 1][column + 1]
        : undefined,
  };
};

export const generateTiles = (): TilesProps[][] => {
  let tiles: TilesProps[][] = [];

  /** generating tiles */
  for (let r = 0; r < MAX_ROWS; r++) {
    tiles.push([]);
    for (let c = 0; c < MAX_COLUMNS; c++) {
      tiles[r].push({
        value: TilesValue.None,
        status: TilesStatus.Closed,
      });
    }
  }

  /** randomly generate bombs */
  let placedTiless = 0;

  while (placedTiless < NUMBER_OF_BOMBS) {
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
      placedTiless++;
    }
  }

  //showing number of bombs for each tile

  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let columnIndex = 0; columnIndex < MAX_COLUMNS; columnIndex++) {
      const currentTile = tiles[rowIndex][columnIndex];

      if (currentTile.value !== TilesValue.Bomb) {
        let numberOfBombs = 0;

        const {
          topLeftTiles,
          topTiles,
          topRightTiles,
          leftTiles,
          rightTiles,
          bottomLeftTiles,
          BottomRightTiles,
          bottomTiles,
        } = gatherAdjacentTiles(tiles, rowIndex, columnIndex);

        topLeftTiles?.value === TilesValue.Bomb && numberOfBombs++;
        topTiles?.value === TilesValue.Bomb && numberOfBombs++;
        topRightTiles?.value === TilesValue.Bomb && numberOfBombs++;
        leftTiles?.value === TilesValue.Bomb && numberOfBombs++;
        rightTiles?.value === TilesValue.Bomb && numberOfBombs++;
        bottomLeftTiles?.value === TilesValue.Bomb && numberOfBombs++;
        bottomTiles?.value === TilesValue.Bomb && numberOfBombs++;
        BottomRightTiles?.value === TilesValue.Bomb && numberOfBombs++;

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

export const openEmptyTiles = (
  tiles: TilesProps[][],
  row: number,
  column: number
): TilesProps[][] => {
  const currentTile = tiles[row][column];

  if (
    currentTile.status === TilesStatus.Visible ||
    currentTile.status === TilesStatus.Flagged
  ) {
    return tiles;
  }

  let newTiles = tiles.slice();
  newTiles[row][column].status = TilesStatus.Visible;

  const {
    topLeftTiles,
    topTiles,
    topRightTiles,
    leftTiles,
    rightTiles,
    bottomLeftTiles,
    BottomRightTiles,
    bottomTiles,
  } = gatherAdjacentTiles(tiles, row, column);

  if (
    topLeftTiles?.status === TilesStatus.Closed &&
    topLeftTiles.value !== TilesValue.Bomb
  ) {
    if (topLeftTiles.value === TilesValue.None) {
      newTiles = openEmptyTiles(tiles, row - 1, column - 1);
    } else {
      newTiles[row][column - 1].status = TilesStatus.Visible;
    }
  }

  if (
    topTiles?.status === TilesStatus.Closed &&
    topTiles.value !== TilesValue.Bomb
  ) {
    if (topTiles.value === TilesValue.None) {
      newTiles = openEmptyTiles(tiles, row - 1, column);
    } else {
      newTiles[row][column].status = TilesStatus.Visible;
    }
  }

  if (
    topRightTiles?.status === TilesStatus.Closed &&
    topRightTiles.value !== TilesValue.Bomb
  ) {
    if (topRightTiles.value === TilesValue.None) {
      newTiles = openEmptyTiles(tiles, row - 1, column + 1);
    } else {
      newTiles[row][column + 1].status = TilesStatus.Visible;
    }
  }

  if (
    leftTiles?.status === TilesStatus.Closed &&
    leftTiles.value !== TilesValue.Bomb
  ) {
    if (leftTiles.value === TilesValue.None) {
      newTiles = openEmptyTiles(tiles, row, column - 1);
    } else {
      newTiles[row][column - 1].status = TilesStatus.Visible;
    }
  }

  if (
    rightTiles?.status === TilesStatus.Closed &&
    rightTiles.value !== TilesValue.Bomb
  ) {
    if (rightTiles.value === TilesValue.None) {
      newTiles = openEmptyTiles(tiles, row, column + 1);
    } else {
      newTiles[row][column + 1].status = TilesStatus.Visible;
    }
  }

  if (
    bottomLeftTiles?.status === TilesStatus.Closed &&
    bottomLeftTiles.value !== TilesValue.Bomb
  ) {
    if (bottomLeftTiles.value === TilesValue.None) {
      newTiles = openEmptyTiles(tiles, row + 1, column - 1);
    } else {
      newTiles[row + 1][column - 1].status = TilesStatus.Visible;
    }
  }

  if (
    bottomTiles?.status === TilesStatus.Closed &&
    bottomTiles.value !== TilesValue.Bomb
  ) {
    if (bottomTiles.value === TilesValue.None) {
      newTiles = openEmptyTiles(tiles, row + 1, column);
    } else {
      newTiles[row + 1][column].status = TilesStatus.Visible;
    }
  }

  if (
    BottomRightTiles?.status === TilesStatus.Closed &&
    BottomRightTiles.value !== TilesValue.Bomb
  ) {
    if (BottomRightTiles.value === TilesValue.None) {
      newTiles = openEmptyTiles(tiles, row + 1, column + 1);
    } else {
      newTiles[row + 1][column + 1].status = TilesStatus.Visible;
    }
  }

  return newTiles;
};
