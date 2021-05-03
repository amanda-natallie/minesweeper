import React, { useEffect, useState } from "react";

import { Window, WindowHeader, Counter, Button, Toolbar } from "react95";
import { generateTiles, openEmptyTiles } from "../../helpers";
import { TilesProps, TilesStatus, TilesValue } from "../../types";

import TileButton from "../TileButton";
import { Content, FlagCounter, Wrapper } from "./styles";

const GameWindow: React.FC = () => {
  const [tiles, setTiles] = useState<TilesProps[][]>(generateTiles());
  const [timer, setTimer] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(0);

  const handleTileClick = (rowParam: number, columParam: number) => {
    !gameStarted && setGameStarted(true);

    const currentTile = tiles[rowParam][columParam];
    let newTiles = tiles.slice();

    if (
      [TilesStatus.Flagged, TilesStatus.Visible].includes(currentTile.status)
    ) {
      return;
    }

    if (currentTile.value === TilesValue.Bomb) {
      //TODO: take care of bomb click
    } else if (currentTile.value === TilesValue.None) {
      setTiles(openEmptyTiles(newTiles, rowParam, columParam));
    } else {
      newTiles[rowParam][columParam].status = TilesStatus.Visible;
      setTiles(newTiles);
    }
  };
  const handleCellContext = (
    e: React.MouseEvent,
    rowParam: number,
    columParam: number
  ) => {
    e.preventDefault();

    if (!gameStarted) {
      return;
    }

    const currentTile = tiles[rowParam][columParam];

    let currentBoard = tiles.slice();

    switch (currentTile.status) {
      case TilesStatus.Visible:
        break;
      case TilesStatus.Opened:
        currentBoard[rowParam][columParam].status = TilesStatus.Flagged;
        setBombCounter((bombCounter) => bombCounter + 1);
        break;
      case TilesStatus.Flagged:
        currentBoard[rowParam][columParam].status = TilesStatus.Opened;
        setBombCounter((bombCounter) => bombCounter - 1);
        break;
    }

    setTiles(currentBoard);
  };

  const handleResetGame = (): void => {
    if (gameStarted) {
      setGameStarted(false);
      setTimer(0);
      setTiles(generateTiles());
      setBombCounter(0);
    }
  };

  useEffect(() => {
    if (gameStarted) {
      const counter = setInterval(() => {
        setTimer((oldTimer) => oldTimer + 1);
      }, 1000);

      return () => {
        clearInterval(counter);
      };
    }
  }, [gameStarted]);

  const renderTiles = (): React.ReactNode => {
    return tiles.map((row, rowIndex) =>
      row.map((column, columnIndex) => (
        <TileButton
          key={`${rowIndex}-${columnIndex}`}
          row={rowIndex}
          onClick={handleTileClick}
          onContext={(e: React.MouseEvent) =>
            handleCellContext(e, rowIndex, columnIndex)
          }
          column={columnIndex}
          status={column.status}
          value={column.value}
        />
      ))
    );
  };

  return (
    <Wrapper>
      <Window className="window">
        <WindowHeader className="window-header">
          <span>MineSweeper</span>
          <Button>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="menu" size="sm" onClick={handleResetGame}>
            Reset Game
          </Button>
          <FlagCounter>🚩 {bombCounter}</FlagCounter>
          <Counter value={timer} minLength={3} />
        </Toolbar>
        <Content>{renderTiles()}</Content>
      </Window>
    </Wrapper>
  );
};

export default GameWindow;
