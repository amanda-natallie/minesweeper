import { combineReducers } from "redux";

import modal from "./modal";
import game from "./game";

const rootReducer = combineReducers({
  modal,
  game,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
