import React from "react";
import { TilesStatus, TilesValue } from "../../types";
import { StyledButton } from "./styles";

interface Iprops {
  row: number;
  column: number;
  status: TilesStatus;
  value: TilesValue;
}

const TileButton = ({ row, column, status, value }: Iprops) => {
  const renderContent = (): React.ReactNode => {
    switch (status) {
      case TilesStatus.Opened:
        return "";
      case TilesStatus.Flagged:
        return "🚩";

      case TilesStatus.Visible:
        return value === TilesValue.Bomb ? "💣" : "E";

      default:
        break;
    }
  };
  return (
    <StyledButton active={status === TilesStatus.Visible}>
      {renderContent()}
    </StyledButton>
  );
};

export default TileButton;
