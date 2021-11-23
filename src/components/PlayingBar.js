import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createNewGame, isWin } from "../activities/GameStatusActivity";
import { attackCell, isValidAttackLocation } from "../activities/AttackActivity";
import { getTargetCellName } from "../activities/MyStupidAIActivity";

export default function PlayingBar(props) {
  const {setGameState, numRows, numCols, 
    colsIndexs, rowsIndexs,
    playerGrid, setPlayerGrid, computerGrid, 
    setComputerGrid, setCoverGrid, computerLastHitCellName,
    setComputerLastHitCellName, setShips, takenWin, setWinner} = props;
  const [targetCell, setTargetCell] = React.useState('');

  const handleNewGameButtonClick = () => {
    createNewGame(setGameState, numRows, numCols, setPlayerGrid, setComputerGrid, setCoverGrid, setShips, setWinner);
  }

  const handleTextFiedChange = (event) => {
    setTargetCell(event.target.value);
  };

  const handleAttackButtonClick = (event) => {
    if(targetCell !== '' && isValidAttackLocation(targetCell, computerGrid, colsIndexs, rowsIndexs)){
      attackCell(targetCell, computerGrid, setComputerGrid, colsIndexs, rowsIndexs);
      const targetCellName = getTargetCellName(computerLastHitCellName, setComputerLastHitCellName, playerGrid, colsIndexs, rowsIndexs);
      attackCell(targetCellName, playerGrid, setPlayerGrid, colsIndexs, rowsIndexs);
    }
    setTargetCell('');

    if(isWin(computerGrid, takenWin)){
      setWinner("You");
    }
    if(isWin(playerGrid, takenWin)){
      setWinner("Computer")
    }
  }

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
        <TextField
            sx={{marginLeft:"10px"}}
            required
            id="outlined-required"
            label="Attack Cell"
            placeholder="Example 'A1'"
            value={targetCell}
            onChange={handleTextFiedChange}
            />
        <Button variant="contained" onClick={handleAttackButtonClick} sx={{marginLeft:"10px"}}>Attack</Button>
        <Button variant="contained" onClick={handleNewGameButtonClick} sx={{marginLeft:"10px"}}>New Game</Button>
    </div>
  );
}
