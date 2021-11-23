import { Route, Routes } from 'react-router-dom';
import MenuStage from './stages/MenuStage';
import GameStage from './stages/GameStage';
import './App.css';

export default function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<MenuStage/>}/>
          <Route path="/play" element={<GameStage/>}/>
        </Routes>
    </div>
  );
}
