import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { createNewGame } from "../activities/GameStatusActivity";

export default function EndGameDialog(props) {
  const { setGameState, numRows, numCols, setPlayerGrid, setComputerGrid, setCoverGrid, setShips, setWinner, winner, open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
    createNewGame(setGameState, numRows, numCols, setPlayerGrid, setComputerGrid, setCoverGrid, setShips, setWinner);
  };

  return (
    <div>
      <Dialog
        sx={{display:"flex", justifyContent:"center", alignItems:"center"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {`${winner} win!`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>New Game</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
