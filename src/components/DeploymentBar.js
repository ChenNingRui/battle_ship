import React from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { findVaildEndCells, 
    deployShip,
    resetGrid,
    resetShipsSelection } from "../activities/ShipDeploymentActivity";
import { startGame } from "../activities/GameStatusActivity";

export default function DeploymentBar(props) {
  const [selectedShip, setSelectedShip] = React.useState('');
  const [startCell, setStartCell] = React.useState('');
  const [endCell, setEndCell] = React.useState('');
  const [validEndCells, setValidEndCells] = React.useState(null);

  const {colsIndexs, rowsIndexs, numRows, 
    numCols, playerGrid, setPlayerGrid, 
    computerGrid, setComputerGrid, setGameState, ships, setShips} = props;

  function handleShipSelectChange(event){
    setSelectedShip(event.target.value);
  }

  function handleEndCellSelectChange(event){
    setEndCell(event.target.value);
  }

  function handleStartCellTextFiedChange(event){
    setStartCell(event.target.value);
    setValidEndCells(findVaildEndCells(selectedShip, event.target.value, playerGrid, colsIndexs, rowsIndexs));
  }

  function handleDeployedButtonClick(){
    if(!startCell || !endCell) return;
    deployShip(startCell, endCell, playerGrid, setPlayerGrid, colsIndexs, rowsIndexs);
    setEndCell('');
    setStartCell('');
    setSelectedShip('');
    setShips(ships.filter(value => value.name !== selectedShip.name));
  }

  function handleResetButtonClick(){
    resetGrid(numRows, numCols, setPlayerGrid);
    resetShipsSelection(setShips);
  }

  function handleStartButtonClick(){
    if(ships && ships.length === 0){
      startGame(setGameState, colsIndexs, rowsIndexs, computerGrid, setComputerGrid);
    }
  }

  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <Box sx={{ width: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Ships</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedShip}
            label="Ships"
            onChange={handleShipSelectChange}
          >
          { ships && ships.map((ship,index) => {
            return <MenuItem key={index} value={ship}>{`${ship.name} size: ${ship.length}`}</MenuItem>
          })}   
          </Select>
        </FormControl>
      </Box>
      <TextField
          sx={{marginLeft:"10px"}}
          required
          id="outlined-required"
          label="Start Cell"
          placeholder="Example 'A1'"
          value={startCell}
          onChange={handleStartCellTextFiedChange}
          />
      <Box sx={{ width: 150, marginLeft:"10px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">End Cell</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={endCell}
            label="End Cell"
            onChange={handleEndCellSelectChange}
            >
            {(validEndCells && validEndCells.length !== 0) && validEndCells.map((item, index) => {
              return <MenuItem key={index} value={item}>{`${item}`}</MenuItem>
            })
            }
          </Select>
        </FormControl>
      </Box>
      <Button data-testid="button-deploy" variant="contained" sx={{marginLeft:"10px"}} onClick={handleDeployedButtonClick}>Deploy</Button>
      <Button data-testid="button-reset" variant="contained" sx={{marginLeft:"10px"}} onClick={handleResetButtonClick}>Reset</Button>
      <Button data-testid="button-start" variant="contained" sx={{marginLeft:"10px"}} onClick={handleStartButtonClick}>Start</Button>
    </div>
  );
}
