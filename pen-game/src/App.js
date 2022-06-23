import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import New from './New';
import Game from './Game';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<New />} />
        <Route path="/game/:numPlayers" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
