import styled from "styled-components";
import { WindowContent, WindowHeader } from "react95";

export const Wrapper = styled.div`
  background: cyan;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .window {
    width: 620px;
    min-height: 200px;
  }
`;

export const StyledWindowHeader = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled(WindowContent)`
  display: flex;
  flex-wrap: wrap;
`;
