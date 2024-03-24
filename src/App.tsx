import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { styleReset } from "react95";

import { Provider } from "react-redux";
import original from "react95/dist/themes/original";
import GameWindow from "./components/GameWindow";
import ModalContainer from "./components/ModalContainer";
import store from "./store";

const GlobalStyles = createGlobalStyle`
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  ${styleReset}
`;

const App: React.FC = () => (
  <Provider store={store}>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <ModalContainer />
      <GameWindow />
    </ThemeProvider>
  </Provider>
);

export default App;
