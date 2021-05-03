import React from "react";
import { StyledCloseButton } from "./styles";

export interface CloseButtonProps {
  action?: Function;
}

const CloseButton = ({ action }: CloseButtonProps) => {
  return (
    <StyledCloseButton onClick={action ? action : undefined}>
      <span />
    </StyledCloseButton>
  );
};

export default CloseButton;
