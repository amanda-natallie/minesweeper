import styled from "styled-components";
import { Button } from "react95";

export const StyledButton = styled(Button)`
  margin: 0;
  width: 30px;
  height: 30px;
  padding: 0;

  &:active {
    border-bottom-color: white;
  }
`;
