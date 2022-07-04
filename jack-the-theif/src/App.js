import { BrowserRouter, Routes, Route } from "react-router-dom"
import Menu from "./game/Menu"
import Game from "./game/Game"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/game/:nP" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
