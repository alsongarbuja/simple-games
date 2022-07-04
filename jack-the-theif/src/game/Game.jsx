import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { divide, pickCard, removeMatches } from '../helpers/card'

const Game = () => {
  const { nP } = useParams()
  const [players, setPlayers] = useState([])
  const [turn, setTurn] = useState(0)
  const [picked, setPicked] = useState(0)
  const [gameFinished, setGameFinished] = useState({
    loser: '',
    gameOver: false,
  })

  useEffect(() => {
    const dC = divide(parseInt(nP), Math.floor(51/parseInt(nP)))
    setPlayers(dC)
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(picked!==0){
      let newPlayerIndex = getNextPlayerIndex();
      setTurn(newPlayerIndex)
    }
  //eslint-disable-next-line
  }, [picked])

  const pick = (i, j) => {
    const newCards = [];

    const c = pickCard(players[turn], players[i][j], players[i])

    for (let k = 0; k < players.length; k++) {
      if(i===k){
        newCards.push(c.opponentNewCards)
      }else if(k===turn){
        newCards.push(c.ownNewCards)
      }else{
        newCards.push(players[k])
      }
    }

    setPlayers(newCards)
    setPicked(prev => prev+1)

    checkGameFinish()
  }

  const removeCards = (i) => {
    let newCards = [];

    for (let j = 0; j < players.length; j++) {
      if(i===j){
        newCards.push(removeMatches(players[j]))
      }else{
        newCards.push(players[j])
      }
    }

    setPlayers(newCards);
  }

  const getNextPlayerIndex = () => {
    let nextPlayerIndex = (turn+1)%players.length;

    while (players[nextPlayerIndex].length===0) {
      nextPlayerIndex = (nextPlayerIndex+1)%players.length;
    }

    return nextPlayerIndex;
  }

  const checkGameFinish = () => {
    let remainingCards = 0;
    for (let j = 0; j < players.length; j++) {
      remainingCards += players[j].length
    }

    if(remainingCards===1){
      let finalPlayer = 0;

      for (let k = 0; k < players.length; k++) {
        if(players[k].length===1){
          finalPlayer = k;
        }
      }
      
      setGameFinished({
        gameOver: true,
        loser: `player ${finalPlayer}`
      })
    }
  }

  return (
    <div className='grid'>
      {
        gameFinished.gameOver&&(
          <>
            <div className='bg-big' />
            <div className="modal">
              <h1>Game Finished</h1>
              <p>Loser: {gameFinished.loser}</p>
            </div>
          </>
        )
      }
      {
        players?.map((p, i) => (
          <div key={i} className="card-wrapper">
            {p.map((n, j) => (
              <div key={n} className="card">
                <span>{turn===i?n:'???'}</span>
                {
                  getNextPlayerIndex()===i&&(
                    <button onClick={()=>pick(i, j)}>P</button>
                  )
                }
              </div>
            ))}
            <br /> <br />
            <button onClick={()=>removeCards(i)}>Remove Pairs</button>
          </div>
        ))
      }
    </div>
  )
}

export default Game