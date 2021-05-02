import React, { useState } from "react";

import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Toolbar,
  Panel,
} from "react95";
import { generateTiles } from "../../helpers";

import TileButton from "../TileButton";
import { Wrapper } from "./styles";

const GameWindow: React.FC = () => {
  const [tiles, setTiles] = useState(generateTiles());

  const renderTiles = (): React.ReactNode => {
    return tiles.map((row, rowIndex) =>
      row.map((column, columnIndex) => <TileButton />)
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
        <Toolbar>
          <Button variant="menu" size="sm">
            File
          </Button>
          <Button variant="menu" size="sm">
            Edit
          </Button>
          <Button variant="menu" size="sm" disabled>
            Save
          </Button>
        </Toolbar>
        <WindowContent>{renderTiles()}</WindowContent>
        <Panel variant="well" className="footer"></Panel>
      </Window>
    </Wrapper>
  );
};

export default GameWindow;
