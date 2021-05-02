import React, { useState } from "react";
import { generateTiles } from "../../helpers";

const Grid = () => {
  const [tiles, setTiles] = useState(generateTiles());

  console.log(tiles);
  return <div></div>;
};

export default Grid;
