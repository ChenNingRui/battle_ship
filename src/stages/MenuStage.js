import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material/';

export default function MenuStage() {
  return (
    <div>
      <div style={{display:"flex", flexDirection:"column"}}>
          <h1>Ning's Battleship</h1>
          <Box sx={{display:"flex", 
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center"}}>
            <Button sx={{margin:"10px"}} variant="outlined">
              <Link style={{textDecoration: 'none', color:"#1769aa"}} to="/play">Play</Link>
            </Button>
            <Button variant="outlined" onClick={() => window.prompt("doesn't implement")}>Rank</Button>
          </Box>
      </div>
    </div>
  );
}