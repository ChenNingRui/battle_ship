import { deployComputerShips, resetGrid, resetShipsSelection, CELL_STATE } from "./ShipDeploymentActivity";

export const GAME_STATUS = {
    PREPARING: {
        value: "preparing",
    },
    PLAYING: {
        value: "playing",
    },
};

export function calculateTakenWin(ships){
    let taken = 0;
    for(let i = 0; i < ships; i++){
        taken += ships[i].length * ships[i].number;
    }
    return taken;
}

export function startGame(setGameState, colsIndexs, rowsIndexs, computerGrid, setComputerGrid){
    setGameState(GAME_STATUS.PLAYING);
    deployComputerShips(colsIndexs, rowsIndexs, computerGrid, setComputerGrid);
}

export function createNewGame(setGameState, numRows, numCols, setPlayerGrid, setComputerGrid, setCoverGrid, setShips, setWinner){
    resetGrid(numRows, numCols, setPlayerGrid);
    resetGrid(numRows, numCols, setComputerGrid);
    resetGrid(numRows, numCols, setCoverGrid);
    setGameState(GAME_STATUS.PREPARING);
    resetShipsSelection(setShips);
    setWinner('');
}

export function isWin(grid, takenWin){
    let taken = 0;
    for(let row = 0; row < grid.length; row++){
        for(let col = 0; col < grid.length; col++){
            if(grid[row][col] === CELL_STATE.HIT.display){
                taken++;
            }
        }
    }
    if(taken === takenWin) return true;
    return false;
}

export function calculateScore(grid){
    let taken = 0;
    for(let row = 0; row < grid.length; row++){
        for(let col = 0; col < grid.length; col++){
            if(grid[row][col] === CELL_STATE.HIT.display){
                taken++;
            }
        }
    }
    return taken;
}