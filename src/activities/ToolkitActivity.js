export function interpretCellNameToValidCoords(cellName, colsIndexs, rowsIndexs){
    if(cellName === undefined || cellName.length === undefined || cellName.length !== 2 ) return null;

    const coords = cellName.split('');
    const col = colsIndexs.indexOf(coords[0]);
    const row = rowsIndexs.indexOf(coords[1]);
  
    if(col === undefined || col === null || col === -1) return null;
    if(row === undefined || row === null || row === -1) return null;
  
    return {row: row, col: col};
  }