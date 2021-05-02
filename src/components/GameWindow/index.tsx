import React from "react";

import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Toolbar,
  Panel,
} from "react95";
import Grid from "../Grid";
import { Wrapper } from "./styles";

const GameWindow: React.FC = () => {
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

        <Panel variant="well" className="footer">
          <Grid />
        </Panel>
      </Window>
    </Wrapper>
  );
};

export default GameWindow;
