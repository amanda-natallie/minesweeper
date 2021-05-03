import React from "react";
import { TilesStatus, TilesValue } from "../../store/modules/game/types";
import { StyledButton } from "./styles";

interface Iprops {
  row: number;
  column: number;
  status: TilesStatus;
  value: TilesValue;
  onClick: (e: React.MouseEvent, rowParam: number, columnParam: number) => any;
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
      case TilesStatus.Closed:
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
      onClick={(e: React.MouseEvent) => onClick(e, row, column)}
      active={status === TilesStatus.Visible}
      className={`value-${value}`}
      onContextMenu={(e: React.MouseEvent) => onContext(e, row, column)}
    >
      {renderContent()}
    </StyledButton>
  );
};

export default TileButton;
