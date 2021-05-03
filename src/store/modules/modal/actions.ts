import { action } from "typesafe-actions";

import { ModalState, ModalTypes } from "./types";

export const setModalInfo = (modalInfo: ModalState): any =>
  action(ModalTypes.SET_MODAL_INFO, modalInfo);
export const resetModal = (): any => action(ModalTypes.RESET_MODAL);
