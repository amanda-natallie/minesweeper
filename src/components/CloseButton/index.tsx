import React from "react";
import { CloseButtonProps } from "../../types";
import { StyledCloseButton } from "./styles";

const CloseButton = ({ action }: CloseButtonProps) => {
  return (
    <StyledCloseButton onClick={action ? action : undefined}>
      <span />
    </StyledCloseButton>
  );
};

export default CloseButton;
