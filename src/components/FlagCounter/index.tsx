import React from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store";

const FlagCounter: React.FC = () => {
  const { flagCount } = useSelector((state: RootReducer) => state.game);

  return <span>🚩 {flagCount}</span>;
};

export default FlagCounter;
