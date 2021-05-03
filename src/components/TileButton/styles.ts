import styled from "styled-components";
import { Button } from "react95";

export const StyledButton = styled(Button)`
  margin: 0;
  padding: 0;
  background: none;
  font-weight: bold;

  &.value-1 {
    color: blue;
  }
  &.value-2 {
    color: green;
  }
  &.value-3 {
    color: red;
  }
  &.value-4 {
    color: purple;
  }
  &.value-5 {
    color: maroon;
  }
  &.value-6 {
    color: turquoise;
  }
  &.value-7 {
    color: black;
  }
  &.value-8 {
    color: gray;
  }
`;
