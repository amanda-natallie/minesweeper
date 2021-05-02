import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { styleReset } from "react95";

import original from "react95/dist/themes/original";
import GameWindow from "./components/GameWindow";

const GlobalStyles = createGlobalStyle`${styleReset}`;

const App: React.FC = () => (
  <div>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <GameWindow />
    </ThemeProvider>
  </div>
);

export default App;
