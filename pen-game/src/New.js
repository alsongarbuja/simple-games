import React, { useState } from 'react'

const New = () => {
    const [numberOfPlayers, setNumberOfPlayers] = useState(2)
    
  return (
    <div className="App">
      <h1>The Pen Game</h1>
      <label htmlFor="">Number of player</label> <br />
      <select value={numberOfPlayers} onChange={(e)=>setNumberOfPlayers(e.target.value)}>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select> <br />
      <a href={`/game/${numberOfPlayers}`} className="new-btn">New Game</a>
    </div>
  )
}

export default New