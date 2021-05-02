import React from "react";
import { TilesStatus, TilesValue } from "../../types";
import { EmptyTile, StyledButton } from "./styles";

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
        return value === TilesValue.Bomb ? (
          "💣"
        ) : value !== TilesValue.None ? (
          value
        ) : (
          <EmptyTile>{value}</EmptyTile>
        );

      default:
        break;
    }
  };
  return (
    <StyledButton
      square
      active={status === TilesStatus.Visible}
      className={`value-${value}`}
    >
      {renderContent()}
    </StyledButton>
  );
};

export default TileButton;
