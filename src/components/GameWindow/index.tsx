import React, { useEffect, useState } from "react";

import { Window, WindowHeader, Counter, Button, Toolbar } from "react95";
import { MAX_COLUMNS, MAX_ROWS } from "../../constants";
import { generateTiles, openEmptyTiles } from "../../helpers";
import { MessageProps, TilesProps, TilesStatus, TilesValue } from "../../types";
import CloseButton from "../CloseButton";
import FeedbackModal from "../FeedbackModal";

import TileButton from "../TileButton";
import { Content, FlagCounter, StyledWindowHeader, Wrapper } from "./styles";

const GameWindow: React.FC = () => {
  const [tiles, setTiles] = useState<TilesProps[][]>(generateTiles());
  const [timer, setTimer] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [bombCounter, setBombCounter] = useState<number>(0);
  const [gameOver, setIsGameOver] = useState<boolean>(false);
  const [gameWon, setIsGameWon] = useState<boolean>(false);

  // TODO: CREATE A MODAL OF GAME WIN/OVER
  const [gameFinishedMessage, setGameFinishedMessage] = useState<MessageProps>({
    isOpen: false,
    message: "",
    icon: "",
  });

  const handleTileClick = (
    e: React.MouseEvent,
    rowParam: number,
    columParam: number
  ) => {
    let newTiles = tiles.slice();
    let currentTile = newTiles[rowParam][columParam];

    if (gameOver || gameWon) {
      return;
    }

    if (!gameStarted) {
      while (currentTile.value === TilesValue.Bomb) {
        console.log("hit a bomb", currentTile);
        newTiles = generateTiles();
        currentTile = newTiles[rowParam][columParam];
      }
      setGameStarted(true);
    }

    if (
      [TilesStatus.Flagged, TilesStatus.Visible].includes(currentTile.status)
    ) {
      return;
    }

    if (currentTile.value === TilesValue.Bomb) {
      setIsGameOver(true);
    } else if (currentTile.value === TilesValue.None) {
      newTiles = openEmptyTiles(newTiles, rowParam, columParam);
    } else {
      newTiles[rowParam][columParam].status = TilesStatus.Visible;
    }

    //check if game is won
    let noEmptyTilesLeft = false;
    for (let r = 0; r < MAX_ROWS; r++) {
      tiles.push([]);
      for (let c = 0; c < MAX_COLUMNS; c++) {
        const currentTile = tiles[r][c];

        if (
          currentTile.value !== TilesValue.Bomb &&
          currentTile.status === TilesStatus.Opened
        ) {
          noEmptyTilesLeft = true;
          break;
        }
      }
    }

    if (!noEmptyTilesLeft) {
      newTiles = tiles.map((rows) =>
        rows.map((col) => {
          if (col.value === TilesValue.Bomb) {
            return {
              ...col,
              status: TilesStatus.Flagged,
            };
          }
          return col;
        })
      );
      setIsGameWon(true);
    }
    setTiles(newTiles);
  };
  const handleRightClick = (
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
    setIsGameOver(false);
    setGameStarted(false);
    setTimer(0);
    setTiles(generateTiles());
    setBombCounter(0);
    setIsGameWon(false);
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

  useEffect(() => {
    if (gameOver) {
      setGameStarted(false);
      setTimer(0);
      setTiles(showAllBombs());
      setGameFinishedMessage({
        isOpen: true,
        message: "You clicked in one bomb! Game over.",
        icon: "💣🔥",
      });
    }
  }, [gameOver]);

  useEffect(() => {
    if (gameWon) {
      setGameStarted(false);
      setTiles(showAllBombs());
      setGameFinishedMessage({
        isOpen: true,
        message: "You won! Congratulations",
        icon: "🎉🎉",
      });
    }
  }, [gameWon]);

  const showAllBombs = (): TilesProps[][] => {
    const currentTiles = tiles.slice();
    return currentTiles.map((row) =>
      row.map((tile) => {
        if (tile.value === TilesValue.Bomb) {
          return {
            ...tile,
            status: TilesStatus.Visible,
          };
        }
        return tile;
      })
    );
  };

  const renderTiles = (): React.ReactNode => {
    return tiles.map((row, rowIndex) =>
      row.map((column, columnIndex) => (
        <TileButton
          key={`${rowIndex}-${columnIndex}`}
          row={rowIndex}
          onClick={handleTileClick}
          onContext={(e: React.MouseEvent) =>
            handleRightClick(e, rowIndex, columnIndex)
          }
          column={columnIndex}
          status={column.status}
          value={column.value}
        />
      ))
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
            <FlagCounter>🚩 {bombCounter}</FlagCounter>
            <Counter value={timer} minLength={3} />
          </Toolbar>
          <Content>{renderTiles()}</Content>
        </Window>
      </Wrapper>
      {gameFinishedMessage.isOpen && (
        <FeedbackModal
          gameFinishedMessage={gameFinishedMessage}
          setGameFinishedMessage={setGameFinishedMessage}
        />
      )}
    </React.Fragment>
  );
};

export default GameWindow;
