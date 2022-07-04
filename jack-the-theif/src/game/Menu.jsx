import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const Menu = () => {
  const [numberOfPlayer, setNumberOfPlayer] = useState(2);

  return (
    <div className="App">
        <h1>Jack The Theif</h1>
        <input type="number" min="2" max="51" value={numberOfPlayer} onChange={(e)=>setNumberOfPlayer(e.target.value)} />
        <Link to={`/game/${numberOfPlayer}`}><button>Start Game</button></Link>
    </div>
  )
}

export default Menu