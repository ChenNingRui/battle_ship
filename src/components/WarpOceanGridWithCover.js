import React from "react";
import OceanGrid from "./OceanGrid";
import { mergeGridWithCover } from "../activities/AttackActivity";

export default function ComputerChessBoard(props) {
  const {grid, coverGrid, setCoverGrid, colsIndexs, rowsIndexs} = props;

  React.useEffect(() => {
    console.log(grid);
    mergeGridWithCover(grid, coverGrid, setCoverGrid);
  }, [grid]);//update when matrix changed only

  return <OceanGrid                  
  colsIndexs={colsIndexs}
  rowsIndexs={rowsIndexs}
  grid={coverGrid}/>;
}