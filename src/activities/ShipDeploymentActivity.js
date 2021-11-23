import { interpretCellNameToValidCoords } from "./ToolkitActivity";

export const CELL_STATE = {
    NORMAL: {
      id: "normal",
      display: "*",
    },
    HIT: {
      id: "hit",
      display: "X"
    },
    MISS:{
      id: "miss",
      display: "M"
    },
    DEPLOYED:{
      id: "deployed",
      display: "|||"
    }
  };

export const SHIPS = [
    {
      name: "carrier",
      length: 5,
      number: 1,
    },
    {
      name: "battleship",
      length: 4,
      number: 1,
    },
    {
      name: "destroyer",
      length: 3,
      number: 1,
    },
    {
      name: "submarine",
      length: 3,
      number: 1,
    },
    {
      name: "patrolBoat",
      length: 2,
      number: 1,
    },
];

export function findVaildEndCells(ship, startCell, grid, colsIndexs, rowsIndexs){
  const validEndCells = [];

  const validCoords = interpretCellNameToValidCoords(startCell, colsIndexs, rowsIndexs);

  if(!validCoords) return null;

  const shipSize = ship.length - 1;
  
  if((validCoords.col + shipSize) < colsIndexs.length
  && grid[validCoords.row][validCoords.col + shipSize] 
  && grid[validCoords.row][validCoords.col + shipSize] === CELL_STATE.NORMAL.display 
  && isAllRightSideCellsAreAvailable(validCoords.col + shipSize, validCoords.col, validCoords.row, grid)){//right
    validEndCells.push(`${colsIndexs[validCoords.col + shipSize]}${rowsIndexs[validCoords.row]}`);
  }
  if((validCoords.col - shipSize) >= 0
  && grid[validCoords.row][validCoords.col - shipSize] 
  && grid[validCoords.row][validCoords.col - shipSize] === CELL_STATE.NORMAL.display 
  && isAllLeftSideCellsAreAvailable(validCoords.col - shipSize, validCoords.col, validCoords.row, grid)){ //left
    validEndCells.push(`${colsIndexs[validCoords.col - shipSize]}${rowsIndexs[validCoords.row]}`);
  }
  if((validCoords.row - shipSize) >= 0
  && grid[validCoords.row - shipSize][validCoords.col]
  && grid[validCoords.row - shipSize][validCoords.col] === CELL_STATE.NORMAL.display
  && isAllUpSideCellsAreAvailable(validCoords.row - shipSize, validCoords.row, validCoords.col, grid)){ //up
    validEndCells.push(`${colsIndexs[validCoords.col]}${rowsIndexs[validCoords.row - shipSize]}`);
  }
  if((validCoords.row + shipSize) < rowsIndexs.length
  && grid[validCoords.row + shipSize][validCoords.col]
  && grid[validCoords.row + shipSize][validCoords.col] === CELL_STATE.NORMAL.display
  && isAllDownSideCellsAreAvailable(validCoords.row + shipSize, validCoords.row, validCoords.col, grid)){ //down
    validEndCells.push(`${colsIndexs[validCoords.col]}${rowsIndexs[validCoords.row + shipSize]}`);
  }

  return validEndCells;
}

function isAllRightSideCellsAreAvailable(endCol, startCol, row, grid){
  for(let i = 0; i <= endCol - startCol; i++){
    if(grid[row][startCol + i] !== CELL_STATE.NORMAL.display) return false;
  }
  return true;
}

function isAllLeftSideCellsAreAvailable(endCol, startCol, row, grid){
  for(let i = startCol - endCol; i >= 0; i--){
    if(grid[row][startCol - i] !== CELL_STATE.NORMAL.display) return false;
  }
  return true;
}

function isAllUpSideCellsAreAvailable(endRow, startRow, col, grid){
  for(let i = startRow - endRow; i >= 0; i--){
    if(grid[startRow - i][col] !== CELL_STATE.NORMAL.display) return false;
  }
  return true;
}

function isAllDownSideCellsAreAvailable(endRow, startRow, col, grid){
  for(let i = 0; i <= endRow - startRow; i++){
    if(grid[startRow + i][col] !== CELL_STATE.NORMAL.display) return false;
  }
  return true;
}

export function deployShip(startCell, endCell, grid, setGrid, colsIndexs, rowsIndexs){
  const startCoords = interpretCellNameToValidCoords(startCell, colsIndexs, rowsIndexs);
  const endCoords = interpretCellNameToValidCoords(endCell, colsIndexs, rowsIndexs);

  if(!startCoords || !endCoords) return;

  const markers = [ ...grid ];

  if(startCoords.col !== endCoords.col){
    if(startCoords.col < endCoords.col){//right
      for(let i = 0; i <= endCoords.col - startCoords.col; i++){
        markers[endCoords.row][startCoords.col + i] = CELL_STATE.DEPLOYED.display;
      }
    }
    if(startCoords.col > endCoords.col){//left
      for(let i = startCoords.col - endCoords.col; i >= 0; i--){
        markers[endCoords.row][startCoords.col - i] = CELL_STATE.DEPLOYED.display;
      }
    }
  }
  if(startCoords.row !== endCoords.row){
    if(startCoords.row < endCoords.row){//down
      for(let i = 0; i <= endCoords.row - startCoords.row; i++){
        markers[startCoords.row + i][startCoords.col] = CELL_STATE.DEPLOYED.display;
      }
    }
    if(startCoords.row > endCoords.row){//up
      for(let i = startCoords.row - endCoords.row; i >= 0; i--){
        markers[startCoords.row - i][startCoords.col] = CELL_STATE.DEPLOYED.display;
      }
    }
  }

  setGrid(markers);
}

export function resetGrid(numRows, numCols, setGrid){
  const rows = [];
  for(let i = 0; i < numRows; i++){
    rows.push(Array.from(Array(numCols), () => CELL_STATE.NORMAL.display));
  }
  
  setGrid(rows);
}

export function resetShipsSelection(setShips){
  setShips(JSON.parse(JSON.stringify(SHIPS)));
}

export function deployComputerShips(colsIndexs, rowsIndexs, grid, setGrid){
  for(let i = 0; i < SHIPS.length; i++){
    deployShipAtRadomLocation(SHIPS[i], colsIndexs, rowsIndexs, grid, setGrid);
  }
}

function deployShipAtRadomLocation(ship, colsIndexs, rowsIndexs, grid, setGrid){
  let startCell = findValidStartCell(colsIndexs, rowsIndexs, grid);

  let arr = findVaildEndCells(ship, startCell, grid, colsIndexs, rowsIndexs);
  if(arr && arr.length > 0) deployShip(startCell, getRandomItemFromArray(arr), grid, setGrid, colsIndexs, rowsIndexs);
  else deployShipAtRadomLocation(ship, colsIndexs, rowsIndexs, grid, setGrid);
}

function findValidStartCell(colsIndexs, rowsIndexs, grid){
  const col = getRandomItemFromArray(colsIndexs);
  const row = getRandomItemFromArray(rowsIndexs);

  if(grid[rowsIndexs.indexOf(row)][colsIndexs.indexOf(col)] === CELL_STATE.NORMAL.display) {
    const index = String(col) + String(row);
    return index;
  }
  else return findValidStartCell(colsIndexs, rowsIndexs, grid);
}

function getRandomItemFromArray(arr){
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}