import { Link } from 'react-router-dom';
import { Button } from '@mui/material/';
import PlayGround from '../components/PlayGround';

export default function GameStage() {
  return (
    <div>
        <Button sx={{margin:"10px", display:"flex", alignItems:"flex-start"}} 
        variant="outlined">
            <Link data-testid="game-link" style={{textDecoration: 'none', color:"#1769aa"}} to="/">Menu</Link>
        </Button>
        <PlayGround/>
    </div>
  );
}