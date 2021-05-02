import styled from "styled-components";
import { WindowContent } from "react95";

export const Wrapper = styled.div`
  background: cyan;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .window-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: "";
      position: absolute;
      background: black;
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .window {
    width: 620px;
    min-height: 200px;
  }
`;

export const Content = styled(WindowContent)`
  display: flex;
  flex-wrap: wrap;
`;
