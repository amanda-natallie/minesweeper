import React from "react";
import { BouncingIcon, ModalWrapper, StyledWindow } from "./styles";
import { Button, WindowContent } from "react95";
import CloseButton from "../CloseButton";
import { StyledWindowHeader } from "../GameWindow/styles";
import { ModalState } from "../../store/modules/modal/types";

interface ModalProps {
  isOpen: boolean;
  setOpen: () => void;
  info: ModalState;
}

export const FeedbackModal = ({
  isOpen,
  setOpen,
  info,
}: ModalProps): JSX.Element => {
  return (
    <ModalWrapper open={isOpen}>
      <StyledWindow>
        <StyledWindowHeader>
          <span>{info.title}</span>
          <CloseButton action={() => setOpen()} />
        </StyledWindowHeader>

        <WindowContent>
          <BouncingIcon>{info.icon}</BouncingIcon>
          <p>{info.message}</p>
        </WindowContent>
        <Button onClick={() => setOpen()}>Ok</Button>
      </StyledWindow>
    </ModalWrapper>
  );
};

export default FeedbackModal;
