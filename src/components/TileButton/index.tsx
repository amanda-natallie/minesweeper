import React from "react";
import { TilesStatus, TilesValue } from "../../types";
import { StyledButton } from "./styles";

interface Iprops {
  row: number;
  column: number;
  status: TilesStatus;
  value: TilesValue;
  onClick: (rowParam: number, columnParam: number) => any;
  onContext: (
    e: React.MouseEvent,
    rowParam: number,
    columnParam: number
  ) => any;
}

const TileButton = ({
  row,
  column,
  status,
  value,
  onClick,
  onContext,
}: Iprops) => {
  const renderContent = (): React.ReactNode => {
    switch (status) {
      case TilesStatus.Opened:
        return null;
      case TilesStatus.Flagged:
        return "🚩";

      case TilesStatus.Visible:
        return value === TilesValue.Bomb
          ? "💣"
          : value !== TilesValue.None
          ? value
          : null;

      default:
        break;
    }
  };
  return (
    <StyledButton
      square
      onClick={() => onClick(row, column)}
      active={status === TilesStatus.Visible}
      className={`value-${value}`}
      onContextMenu={(e: React.MouseEvent) => onContext(e, row, column)}
    >
      {renderContent()}
    </StyledButton>
  );
};

export default TileButton;
