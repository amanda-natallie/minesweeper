import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../store";
import { resetModal } from "../../store/modules/modal/actions";
import FeedbackModal from "../FeedbackModal";

const ModalContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const { modal } = useSelector((state: RootReducer) => state);

  return (
    <FeedbackModal
      isOpen={modal.isOpen}
      setOpen={() => dispatch(resetModal())}
      info={modal}
    />
  );
};

export default ModalContainer;
