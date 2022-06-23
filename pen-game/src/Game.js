import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const Game = () => {
  const { numPlayers } = useParams()
  const [gameStarted, setGameStarted] = useState(false)
  const [players, setPlayers] = useState([])
  const [turn, setTurn] = useState(0)
  const [currentPoint, setCurrentPoint] = useState(0)
  const [disabledButtons, setDisabledButtons] = useState([])
  const [gameFinish, setGameFinish] = useState({
    gameOver: false,
    winner: '',
  })

  useEffect(() => {
    const pls = [];

    for (let i = 0; i < numPlayers; i++) {
      pls.push({
        name: '',
        winPoint: 0,
        previousMove: null,
      })
    }

    setPlayers(pls)
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(players[turn]?.previousMove){
      setDisabledButtons(getDisablingBtns(players[turn].previousMove))
    }else{
      setDisabledButtons([])
    }
  // eslint-disable-next-line
  }, [turn])

  useEffect(()=> {
    const winingPoints = players.map(pl => pl.winPoint)

    if(winingPoints.indexOf(currentPoint)!==-1){
      setGameFinish({
        gameOver: true,
        winner: players[winingPoints.indexOf(currentPoint)].name,
      })
    }
  // eslint-disable-next-line
  }, [currentPoint])

  const generate = (i) => {
    const num = Math.floor(Math.random() * (20 - 15 + 1) + 15)
    document.getElementById(`player${i}`).value = num;
    
    const newPlayers = [];

    for (let j = 0; j < players.length; j++) {
      if(i===j){
        newPlayers.push({...players[j], winPoint: num})
      }else{
        newPlayers.push(players[j])
      }
    }

    setPlayers(newPlayers)
  }

  const handleChange = (e, i) => {
    const newPlayers = [];

    for (let j = 0; j < players.length; j++) {
      if(i===j){
        newPlayers.push({...players[j], [e.target.name]: e.target.value})
      }else{
        newPlayers.push(players[j])
      }
    }

    setPlayers(newPlayers)
  }

  const isDisabled = (name) => {
    const n = disabledButtons.indexOf(name)
    if(n!==-1){
      return true;
    }

    return false;
  }

  const nextMove = (btnName) => {
    const newPlayers = []

    for (let index = 0; index < players.length; index++) {
      if(index===turn){
        newPlayers.push({...players[index], previousMove: btnName})
      }else{
        newPlayers.push(players[index])
      }
    }

    setPlayers(newPlayers)
    setCurrentPoint(prev => prev+getPoints(btnName))

    if(turn===players.length-1){
      setTurn(0)
    }else{
      setTurn(turn+1)
    }
  }

  if(gameFinish.gameOver){
    return <div className='text-center'>
      <h1>Game finished, Winner: {gameFinish.winner}</h1>
      <a className='new-btn' href='/'>Restart</a>
    </div>
  }

  return (
    <div className="grid">
      <div className="game-board">
        <div className="board text-center">
          <div>
            <button onClick={()=>nextMove('+3')} className={`game-btns ${isDisabled('+3')&&'disabled-game--btns'}`} disabled={isDisabled('+3')}>Plus 3</button> <br /><br />
            <button onClick={()=>nextMove('-3')} className={`game-btns ${isDisabled('-3')&&'disabled-game--btns'}`} disabled={isDisabled('-3')}>Minus 3</button>
          </div>
          <div className="text-center">
            <button onClick={()=>nextMove('neutral')} className={`game-btns ${isDisabled('neutral')&&'disabled-game--btns'}`} disabled={isDisabled('neutral')}>Neutral</button> <br /><br />
            <button onClick={()=>nextMove('+2')} className={`game-btns ${isDisabled('+2')&&'disabled-game--btns'}`} disabled={isDisabled('+2')}>Plus 2</button> <br />
            <div className="title">
              <h2>The Pen Game</h2>
            </div>
            <button onClick={()=>nextMove('-2')} className={`game-btns ${isDisabled('-2')&&'disabled-game--btns'}`} disabled={isDisabled('-2')}>Minus 2</button>
          </div>
          <div className="text-center">
            <button onClick={()=>nextMove('+1')} className={`game-btns ${isDisabled('+1')&&'disabled-game--btns'}`} disabled={isDisabled('+1')}>Plus 1</button> <br /><br />
            <button onClick={()=>nextMove('-1')} className={`game-btns ${isDisabled('-1')&&'disabled-game--btns'}`} disabled={isDisabled('-1')}>Minus 1</button>
          </div>
        </div>
        <div className="current-point">
          <h1>Current Point</h1>
          <h2>{currentPoint}</h2>
        </div>
      </div>
      <div className="game-logs">
        {
          players.map((pl, i) => (
            <div className={`log-tab ${i===turn&&'active-player'}`} key={i}>
              <h4>{pl?.name}</h4>
              <p><b>Win point: </b> {pl.winPoint}</p>
              <p><b>Previous Move: </b> {pl.previousMove}</p>
            </div>
          ))
        }
      </div>
      {
        !gameStarted&&(<>
          <div className='bg-big' />
          <div className='modal'>
            <h1>Fill details to Start Game</h1>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Wining point</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    players.map((pl, i) => (
                      <tr key={i}>
                        <td>
                          <input type="text" name="name" placeholder="Player name" value={pl.name} onChange={(e)=>handleChange(e, i)} />
                        </td>
                        <td>
                          <input type="number" name="winPoint" value={pl.winPoint} onChange={(e)=>handleChange(e, i)} placeholder="Win point" min="15" max="20" id={`player${i}`} />
                        </td>
                        <td>
                          <span className="gen-btn" tabIndex="0" onKeyUp={(e)=>{if(e.key==='Enter')generate(i)}} onClick={()=>generate(i)}>Generate Random</span>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <button onClick={()=>setGameStarted(true)}>Start Game</button>
          </div>
        </>)
      }
    </div>
  )
}

export default Game

const getDisablingBtns = (btnName) => {
  switch (btnName) {
    case '+3':
      return ['+3', '+1'];
    case '-3':
      return ['-3', '-1'];
    case '+2':
      return ['+2', '+3'];
    case '-2':
      return ['-2', '-3'];
    case '+1':
      return ['+2', '+1'];
    case '-1':
      return ['-2', '-1'];
    case 'neutral':
      return ['neutral'];
    default:
      return [];
  }
}

const getPoints = (btnName) => {
  switch (btnName) {
    case '+3':
      return 3;
    case '-3':
      return -3;
    case '+2':
      return 2;
    case '-2':
      return -2;
    case '+1':
      return 1;
    case '-1':
      return -1;
    case 'neutral':
      return 0;
    default:
      return 0;
  }
}