import React from "react";
import { MessageProps } from "../../types";
import { BouncingIcon, ModalWrapper, StyledWindow } from "./styles";
import { Button, WindowContent } from "react95";
import CloseButton from "../CloseButton";
import { StyledWindowHeader } from "../GameWindow/styles";

interface ModalProps {
  gameFinishedMessage: MessageProps;
  setGameFinishedMessage: Function;
}

export const FeedbackModal = ({
  gameFinishedMessage,
  setGameFinishedMessage,
}: ModalProps): JSX.Element => {
  const handleOkButton = () => {
    setGameFinishedMessage({
      isOpen: false,
      message: "",
      icon: "",
    });
  };
  return (
    <ModalWrapper open={gameFinishedMessage.isOpen}>
      <StyledWindow>
        <StyledWindowHeader>
          <span>game over!</span>
          <CloseButton action={() => handleOkButton()} />
        </StyledWindowHeader>

        <WindowContent>
          <BouncingIcon>{gameFinishedMessage.icon}</BouncingIcon>
          <p>{gameFinishedMessage.message}</p>
        </WindowContent>
        <Button onClick={() => handleOkButton()}>Ok</Button>
      </StyledWindow>
    </ModalWrapper>
  );
};

export default FeedbackModal;
