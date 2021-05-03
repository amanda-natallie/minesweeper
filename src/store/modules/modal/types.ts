export enum ModalTypes {
  SET_MODAL_INFO = "@modal/SET_MODAL_INFO",
  RESET_MODAL = "@modal/RESET_MODAL",
}

export interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  icon: string;
}
