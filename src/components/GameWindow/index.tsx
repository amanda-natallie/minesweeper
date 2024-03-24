import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Window, Counter, Button, Toolbar } from "react95";
import { RootReducer } from "../../store";
import {
  openTiles,
  resetGame,
  setGameStarted,
} from "../../store/modules/game/actions";
import { TilesValue } from "../../store/modules/game/types";

import { setModalInfo } from "../../store/modules/modal/actions";

import CloseButton from "../CloseButton";
import FlagCounter from "../FlagCounter";
import TileButton from "../TileButton";
import { Content, StyledWindowHeader, Wrapper } from "./styles";
import ContactBox from "../ContactBox";

const GameWindow: React.FC = () => {
  const dispatch = useDispatch();
  const { isGameOver, isGameStarted, isGameWon, tiles } = useSelector(
    (state: RootReducer) => state.game
  );
  const [timer, setTimer] = useState<number>(0);

  const handleResetGame = (): void => {
    setTimer(0);
    dispatch(resetGame());
  };

  useEffect(() => {
    let counter: NodeJS.Timeout;
    if (isGameStarted) {
      counter = setInterval(() => {
        setTimer((oldTimer) => oldTimer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(counter);
    };
  }, [isGameStarted]);

  useEffect(() => {
    if (isGameOver) {
      dispatch(setGameStarted(false));
      showAllBombs();
      dispatch(
        setModalInfo({
          isOpen: true,
          title: "Game over",
          message: "You've clicked on a bomb! Game over.",
          icon: "💣🔥",
        })
      );
    }
  }, [isGameOver]);

  useEffect(() => {
    if (isGameWon) {
      dispatch(setGameStarted(false));
      showAllBombs();
      dispatch(
        setModalInfo({
          isOpen: true,
          title: "Game completed!",
          message: "You won! Congratulations",
          icon: "🎉🎉",
        })
      );
    }
  }, [isGameWon]);

  const showAllBombs = () => {
    let openTilesToOpen: string[] = [];
    tiles.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column.value === TilesValue.Bomb) {
          openTilesToOpen.push(`${rowIndex},${columnIndex}`);
        }
      });
    });
    dispatch(openTiles(openTilesToOpen));
  };

  const renderTiles = (): React.ReactNode => {
    return (
      tiles &&
      tiles.map((row, rowIndex) =>
        row.map((column, columnIndex) => (
          <TileButton
            key={`${rowIndex}-${columnIndex}`}
            row={rowIndex}
            column={columnIndex}
            value={column.value}
          />
        ))
      )
    );
  };

  return (
    <React.Fragment>
      <Wrapper>
        <Window className="window">
          <StyledWindowHeader>
            <span>MineSweeper</span>
            <CloseButton />
          </StyledWindowHeader>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="menu" size="sm" onClick={handleResetGame}>
              Reset Game
            </Button>
            <FlagCounter />
            <Counter value={timer} minLength={3} />
          </Toolbar>
          <Content>{renderTiles()}</Content>
          <ContactBox />
        </Window>
      </Wrapper>
    </React.Fragment>
  );
};

export default GameWindow;
