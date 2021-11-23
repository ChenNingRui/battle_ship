import React from "react";

export default function OceanGrid(props) {
    const {grid, colsIndexs, rowsIndexs} = props;

    return (
      <div>
        <div style={{display:"flex", flexDirection:"row", marginLeft:"20px"}}>
          {colsIndexs.map((value, index) => <h5 key={index} style={{margin:"11.5px"}}>{value}</h5>)}
        </div>
        <div style={{display:"flex", flexDirection:"row"}}>
          <div style={{display:"flex", flexDirection:"column"}}>
            {rowsIndexs.map((value, index) => <h5 key={index} style={{margin:"10px"}}>{value}</h5>)}
          </div>
          <div style={{display:"grid", gridTemplateColumns:`repeat(${colsIndexs.length}, 30px)`}}>
            {grid.map((rows, rowIndex) => 
              rows.map((col, colIndex) => 
              <div
              key={`${rowIndex}${colIndex}`}
              style={{border:"solid 1px black", display:"flex", justifyContent:"center", alignItems:"center"}}>
                {col}
              </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
  