import { CELL_STATE } from "./ShipDeploymentActivity";
import { interpretCellNameToValidCoords } from "./ToolkitActivity";

let directions = [
    {
        name: "left",
        weight: 0,
    },
    {
        name: "right",
        weight: 0,
    },
    {
        name: "up",
        weight: 0,
    },
    {
        name: "down",
        weight: 0,
    },
];


export function getTargetCellName(lastHit, setLastHit, grid, colsIndexs, rowsIndexs){
    let cellName;
    if(lastHit === ''){
        cellName = getRamdonVaildCellName(colsIndexs, rowsIndexs, setLastHit, grid);
    }
    else{
        cellName =  getVaildCellNameBasedOnLastHit(colsIndexs, rowsIndexs, lastHit, setLastHit, grid);
    }
    return cellName;
}

function getVaildCellNameBasedOnLastHit(colsIndexs, rowsIndexs, lastHit, setLastHit, grid){
    if(isAllDirectionsEquelToZero()){
        setLastHit('');
        return getRamdonVaildCellName(colsIndexs, rowsIndexs, setLastHit, grid);
    }
    else{
        directions = directions.sort((state, next) => next.weight - state.weight);
        let highestWeightDirection = directions[0];

        const coords = getTargetCellCoordsBasedOnDirectionWeight(colsIndexs, rowsIndexs, highestWeightDirection, lastHit);
        if(grid[coords.row] === undefined 
            || grid[coords.row][coords.col] === undefined 
            || grid[coords.row][coords.col] === CELL_STATE.HIT.display
            || grid[coords.row][coords.col] === CELL_STATE.MISS.display) {

                highestWeightDirection.weight = 0;
                return getVaildCellNameBasedOnLastHit(colsIndexs, rowsIndexs, lastHit, setLastHit, grid);
        }
        else {
            if(isShipHit(coords, grid)){
                highestWeightDirection.weight++;
                judgeShipDirectionBasedOnHighestWeight(highestWeightDirection);
            }
            else{
                highestWeightDirection.weight = 0;
            }
            return colsIndexs[coords.col] + rowsIndexs[coords.row];
        }
    }
}

function judgeShipDirectionBasedOnHighestWeight(highestWeightDirection){
    if(highestWeightDirection.weight > 4){
        directions.map((value) => {
            value.weight = 0;
            return value;
        })
    }

    if(highestWeightDirection.weight >= 2){
        if(highestWeightDirection.name === "left" || highestWeightDirection.name === "right"){
            directions.map((value) => {
                if(value.name === "up" || value.name === "down"){
                    value.weight = 0;
                }
                return value;
            })
        }
        if(highestWeightDirection.name === "up" || highestWeightDirection.name === "down"){
            directions.map((value) => {
                if(value.name === "left" || value.name === "right"){
                    value.weight = 0;
                }
                return value;
            })
        }
    }
}

function isShipHit(coords, grid){
    if(grid[coords.row][coords.col] === CELL_STATE.NORMAL.display){
        return false;
    }

    return true;
}

function getTargetCellCoordsBasedOnDirectionWeight(colsIndexs, rowsIndexs, highestWeightDirection, lastHit){
    const lastHitCellCoords = interpretCellNameToValidCoords(lastHit, colsIndexs, rowsIndexs);

    let coords = null;
    if(lastHitCellCoords.col === -1 || lastHitCellCoords.row === -1) return coords;

    if(highestWeightDirection.name === "left"){
        coords = {row:lastHitCellCoords.row, col:lastHitCellCoords.col - highestWeightDirection.weight};
    }
    if(highestWeightDirection.name === "right"){
        coords = {row:lastHitCellCoords.row, col:lastHitCellCoords.col + highestWeightDirection.weight};
    }
    if(highestWeightDirection.name === "up"){
        coords = {row:lastHitCellCoords.row - highestWeightDirection.weight, col:lastHitCellCoords.col};
    }
    if(highestWeightDirection.name === "down"){
        coords = {row:lastHitCellCoords.row + highestWeightDirection.weight, col:lastHitCellCoords.col};
    }

    return coords;

}

function isAllDirectionsEquelToZero(){
    return directions.every((value => value.weight === 0))
}

function getRamdonVaildCellName(colsIndexs, rowsIndexs, setLastHit, grid){
    const col = getRandomElementIndexFromArray(colsIndexs);
    const row = getRandomElementIndexFromArray(rowsIndexs);
  
    if(grid[row][col] !== CELL_STATE.HIT.display
    && grid[row][col] !== CELL_STATE.MISS.display) {
        const cellName = String(colsIndexs[col]) + String(rowsIndexs[row]);

        if(grid[row][col] === CELL_STATE.DEPLOYED.display){
            setLastHit(cellName);
            directions.map((value) => value.weight = 1);
        }

        return cellName;
    }
    else return getRamdonVaildCellName(colsIndexs, rowsIndexs, setLastHit, grid);
}

function getRandomElementIndexFromArray(arr){
    const index = Math.floor(Math.random() * arr.length);
    return index;
}