import styled, { keyframes } from "styled-components";
import { Window } from "react95";

interface ModalProps {
  open: boolean;
}

export const ModalWrapper = styled.div<ModalProps>`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledWindow = styled(Window)`
  width: 400px;
`;
export const BouncingIcon = styled.span``;

const breatheAnimation = keyframes`
 0% { height: 100px; width: 100px; }
 30% { height: 400px; width: 400px; opacity: 1 }
 40% { height: 405px; width: 405px; opacity: 0.3; }
 100% { height: 100px; width: 100px; opacity: 0.6; }
`;
