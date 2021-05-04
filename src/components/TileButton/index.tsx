import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MAX_COLUMNS, MAX_ROWS, NUMBER_OF_BOMBS } from "../../constants";
import { generateTiles } from "../../helpers/tilesHelpers";
import { RootReducer } from "../../store";
import {
  decrementFlagCount,
  incrementFlagCount,
  openTiles,
  setGameStarted,
  setIsGameOver,
  setIsGameWon,
  setTiles,
} from "../../store/modules/game/actions";
import { TilesProps, TilesValue } from "../../store/modules/game/types";
import { setModalInfo } from "../../store/modules/modal/actions";
import { StyledButton } from "./styles";

interface Iprops {
  row: number;
  column: number;
  value: TilesValue;
}

const TileButton = ({ row, column, value }: Iprops) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFlagged, setIsFlagged] = useState<boolean>(false);
  const {
    openedTiles,
    isGameWon,
    isGameStarted,
    flagCount,
    isGameOver,
  } = useSelector((state: RootReducer) => state.game);

  useEffect(() => {
    if (openedTiles.includes(`${row},${column}`)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [openedTiles, setIsOpen]);

  useEffect(() => {
    if (!flagCount) {
      setIsFlagged(false);
    }
  }, [flagCount]);

  const handleOnContext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!isOpen && isGameStarted) {
        if (isFlagged) {
          dispatch(decrementFlagCount());
          setIsFlagged(false);
        } else {
          dispatch(incrementFlagCount());
          setIsFlagged(true);
        }
      }
    },
    [dispatch, isOpen, isFlagged, isGameStarted]
  );

  const handleOnClick = useCallback(() => {
    if (!isFlagged && !(isGameWon || isGameOver)) {
      if (!isGameStarted) {
        let tiles: TilesProps[][] = generateTiles();
        let currValue: TilesValue = tiles[row][column].value;
        while (currValue === TilesValue.Bomb) {
          tiles = generateTiles();
          currValue = tiles[row][column].value;
        }
        dispatch(setGameStarted(true));
        dispatch(setTiles(tiles));
      }
      dispatch(openTiles([`${row},${column}`]));
    }
  }, [dispatch, isFlagged, isGameStarted, isGameWon, isGameOver]);

  useEffect(() => {
    if (isOpen) {
      if (isFlagged) {
        dispatch(decrementFlagCount());
        setIsFlagged(false);
      }

      if (openedTiles.length === MAX_ROWS * MAX_COLUMNS - NUMBER_OF_BOMBS) {
        dispatch(setIsGameWon(true));
      }

      if (value === TilesValue.Bomb) {
        if (!openedTiles.length || isGameWon) {
          return;
        }
        dispatch(setIsGameOver(true));
        dispatch(
          setModalInfo({
            isOpen: true,
            title: "Game over",
            message: "You clicked in one bomb! Game over.",
            icon: "💣🔥",
          })
        );
      } else if (value === TilesValue.None) {
        let tilesToOpen = [];

        const initialRow = !row ? 0 : row - 1;
        const lastRow = row === MAX_ROWS - 1 ? MAX_ROWS - 1 : row + 1;
        const initialColumn = !column ? 0 : column - 1;
        const lastColumn =
          column === MAX_COLUMNS - 1 ? MAX_COLUMNS - 1 : column + 1;

        for (let currRow = initialRow; currRow <= lastRow; currRow++) {
          for (
            let currColumn = initialColumn;
            currColumn <= lastColumn;
            currColumn++
          ) {
            tilesToOpen.push(`${currRow},${currColumn}`);
          }
        }

        dispatch(openTiles(tilesToOpen));
      }
    }
  }, [isOpen]);

  const renderContent = (): React.ReactNode => {
    if (isOpen && value > 0) {
      return value === TilesValue.Bomb ? "💣" : value;
    }
    if (isFlagged) {
      return "🚩";
    }
    return null;
  };

  return (
    <StyledButton
      square
      onClick={handleOnClick}
      active={isOpen}
      className={`value-${value}`}
      onContextMenu={handleOnContext}
    >
      {renderContent()}
    </StyledButton>
  );
};

export default TileButton;
