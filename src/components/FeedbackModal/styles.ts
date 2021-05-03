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
  display: ${({ open }) => (open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

export const StyledWindow = styled(Window)`
  width: 400px;
  text-align: center;
  padding-bottom: 30px;
`;
const breatheAnimation = keyframes`
 0% { font-size: 30px;}
 50% { font-size: 40px; }
 100% { font-size: 30px;}
`;

export const BouncingIcon = styled.p`
  width: 100%;
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: ${breatheAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;
