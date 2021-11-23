import { CELL_STATE } from "./ShipDeploymentActivity";
import { interpretCellNameToValidCoords } from "./ToolkitActivity";

export function attackCell(cellName, grid, setGrid, colsIndexs, rowsIndexs){
    if(cellName === undefined || cellName.length === undefined || cellName.length !== 2 || grid === undefined) return;

    setCurrentCellState(cellName, grid, setGrid, colsIndexs, rowsIndexs);
}

function setCurrentCellState(cellName, grid, setGrid, colsIndexs, rowsIndexs){
    const coords = isCellExist(cellName, grid, colsIndexs, rowsIndexs);

    if(!coords) return;

    const markers = [ ...grid ];
    const target = isHitTheTarget(coords, grid);
    if(target){
        markers[target.row][target.col] = CELL_STATE.HIT.display;
        setGrid(markers);
    }

    if(markers[coords.row][coords.col] === CELL_STATE.NORMAL.display){
        markers[coords.row][coords.col] = CELL_STATE.MISS.display;
        setGrid(markers);
    }
}

function isHitTheTarget(coords, grid){
    if(grid[coords.row][coords.col] === CELL_STATE.DEPLOYED.display){
        return coords;
    }

    return null;
}

function isCellExist(cellName, grid, colsIndexs, rowsIndexs){
    const coords = interpretCellNameToValidCoords(cellName, colsIndexs, rowsIndexs);

    if(coords.col !== -1 && coords.row !== -1 && grid[coords.row] && grid[coords.row][coords.col]){
        return coords;
    }

    return null;
}

export function isValidAttackLocation(cellName, grid, colsIndexs, rowsIndexs){
    const coords = interpretCellNameToValidCoords(cellName, colsIndexs, rowsIndexs);
    if(coords.row === -1 || coords.col === -1 
        || grid[coords.row][coords.col] === CELL_STATE.HIT.display
        || grid[coords.row][coords.col] === CELL_STATE.MISS.display){
            return false
        }
    return true;
}

export function mergeGridWithCover(grid, coverGrid, setCoverGrid){
    const cover = [...coverGrid];
    for(let row = 0; row < grid.length; row++){
        for(let col = 0; col < grid[row].length; col++){
            if(grid[row][col] === CELL_STATE.HIT.display){
                cover[row][col] = CELL_STATE.HIT.display;
            }
            if(grid[row][col] === CELL_STATE.MISS.display){
                cover[row][col] = CELL_STATE.MISS.display;
            }
        }
    }
    setCoverGrid(cover);
}