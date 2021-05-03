import { createStore, Store } from "redux";

import rootReducer from "./modules";
import { ModalState } from "./modules/modal/types";
import { GameState } from "./modules/game/types";
import { composeWithDevTools } from "redux-devtools-extension";

export interface RootReducer {
  modal: ModalState;
  game: GameState;
}

const store: Store<RootReducer> = createStore(
  rootReducer,
  composeWithDevTools()
);
export default store;
