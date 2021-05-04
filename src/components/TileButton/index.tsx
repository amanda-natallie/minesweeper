import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MAX_COLUMNS, MAX_ROWS } from "../../constants";
import { RootReducer } from "../../store";
import {
  decrementFlagCount,
  incrementFlagCount,
  openTiles,
  setIsGameOver,
} from "../../store/modules/game/actions";
import { TilesValue } from "../../store/modules/game/types";
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

  const { openedTiles } = useSelector((state: RootReducer) => state.game);

  useEffect(() => {
    if (!isOpen && openedTiles.includes(`${row},${column}`)) {
      setIsOpen(true);
    }
  }, [openedTiles, setIsOpen]);

  const handleOnContext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!isOpen) {
        if (isFlagged) {
          dispatch(decrementFlagCount());
          setIsFlagged(false);
        } else {
          dispatch(incrementFlagCount());
          setIsFlagged(true);
        }
      }
    },
    [dispatch, isOpen, isFlagged]
  );

  const handleOnClick = useCallback(() => {
    if (!isFlagged) {
      dispatch(openTiles([`${row},${column}`]));
    }
  }, [dispatch, isFlagged]);

  useEffect(() => {
    if (isOpen) {
      if (value === TilesValue.Bomb) {
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
        const lastRow = row === MAX_ROWS ? MAX_ROWS : row + 1;
        const initialColumn = !column ? 0 : column - 1;
        const lastColumn = column === MAX_COLUMNS ? MAX_COLUMNS : column + 1;

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
  }, [isOpen, value]);

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
