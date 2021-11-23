import React from 'react';
import OceanGrid from './OceanGrid';
import WarpOceanGridWithCover from './WarpOceanGridWithCover';
import DeploymentBar from './DeploymentBar';
import PlayingBar from './PlayingBar';
import EndGameDialog from './EndGameDialog';
import { CELL_STATE, SHIPS } from '../activities/ShipDeploymentActivity';
import { GAME_STATUS, calculateTakenWin, calculateScore } from "../activities/GameStatusActivity";

export default function PlayGround() {
    const colsIndexs = ["A", "B","C", "D", "E", "F", "G", "H", "I", "J"];
    const rowsIndexs = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const numRows = rowsIndexs.length;
    const numCols = colsIndexs.length;

    const [playerGrid, setPlayerGrid] = React.useState(() => {
        const rows = [];
        for(let i = 0; i < numRows; i++){
          rows.push(Array.from(Array(numCols), () => CELL_STATE.NORMAL.display));
        }
        return rows;
      });
    const [computerGrid, setComputerGrid] = React.useState(() => {
        const rows = [];
        for(let i = 0; i < numRows; i++){
            rows.push(Array.from(Array(numCols), () => CELL_STATE.NORMAL.display));
        }
        return rows;
    });
    const [coverGrid, setCoverGrid] = React.useState(() => {
        const rows = [];
        for(let i = 0; i < numRows; i++){
            rows.push(Array.from(Array(numCols), () => CELL_STATE.NORMAL.display));
        }
        return rows;
    });
    const [gameState, setGameState] = React.useState(GAME_STATUS.PREPARING);
    const [computerLastHitCellName, setComputerLastHitCellName] = React.useState('');
    const [ships, setShips] = React.useState(JSON.parse(JSON.stringify(SHIPS))); //deep clone
    const [takenWin] = React.useState(calculateTakenWin(SHIPS));
    const [winner, setWinner] = React.useState('');
    const [dialogOpen, setDialogOpen] = React.useState(false);

    React.useEffect(() => {
        if(winner && winner !== ''){
            setDialogOpen(true);
        }
    },[winner]);

    return (
        <div className="App" style={{display:"flex", flexDirection:"column"}}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                <div>
                    <h3 data-testid="player-score">{`You: ${calculateScore(computerGrid)}`}</h3>
                    <OceanGrid 
                    colsIndexs={colsIndexs}
                    rowsIndexs={rowsIndexs}
                    grid={playerGrid}/>
                </div>
                <div>
                    <h3 data-testid="computer-score">{`Computer: ${calculateScore(playerGrid)}`}</h3>
                    <WarpOceanGridWithCover 
                    colsIndexs={colsIndexs}
                    rowsIndexs={rowsIndexs}
                    coverGrid={coverGrid} 
                    grid={computerGrid}
                    setCoverGrid={setCoverGrid}
                    />
                </div>
            </div>
            <div style={{margin:"20px"}}>
            { gameState === GAME_STATUS.PREPARING && 
                <DeploymentBar
                ships={ships}
                setShips={setShips}
                numRows={numRows}
                numCols={numCols}
                colsIndexs={colsIndexs}
                rowsIndexs={rowsIndexs} 
                playerGrid={playerGrid}
                setPlayerGrid={setPlayerGrid}
                computerGrid={computerGrid}
                setComputerGrid={setComputerGrid}
                setGameState={setGameState}
                />
            }
            { gameState === GAME_STATUS.PLAYING && 
                <PlayingBar
                setWinner={setWinner}
                takenWin={takenWin}
                setShips={setShips}
                setGameState={setGameState}
                numRows={numRows}
                numCols={numCols}
                colsIndexs={colsIndexs}
                rowsIndexs={rowsIndexs}
                playerGrid={playerGrid}
                setPlayerGrid={setPlayerGrid}
                computerGrid={computerGrid}
                setComputerGrid={setComputerGrid}
                setCoverGrid={setCoverGrid}
                computerLastHitCellName={computerLastHitCellName}
                setComputerLastHitCellName={setComputerLastHitCellName}
                />
            }
            </div>
            <EndGameDialog
            setGameState={setGameState}
            numRows={numRows}
            numCols={numCols}
            setPlayerGrid={setPlayerGrid}
            setComputerGrid={setComputerGrid}
            setCoverGrid={setCoverGrid}
            setShips={setShips}
            setWinner={setWinner}
            winner={winner}
            open={dialogOpen} 
            setOpen={setDialogOpen}
            />
        </div>
    );
}