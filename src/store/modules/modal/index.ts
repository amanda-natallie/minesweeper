import { Reducer } from "redux";

import { ModalState, ModalTypes } from "./types";

const INITIAL_STATE: ModalState = {
  isOpen: false,
  title: "",
  message: "",
  icon: "",
};

const reducer: Reducer<ModalState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ModalTypes.SET_MODAL_INFO:
      return action.payload;
    case ModalTypes.RESET_MODAL:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default reducer;
