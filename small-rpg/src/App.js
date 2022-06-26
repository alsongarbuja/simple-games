import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [enemies, setEnemies] = useState({
    boss: 100,
    semiBossA: 50,
    semiBossB: 50,
    minionsA: 30,
    minionsB: 30,
    minionsC: 30,
  })
  const [players, setPlayers] = useState({
    attacker: 10,
    healer: 50,
    hero: 20,
  })
  const [move, setMove] = useState({
    attacker: 0,
    hero: 0,
  })
  const [notification, setNotification] = useState([])
  const [chance, setChance] = useState(false)
  const [chanceCards, setChanceCards] = useState([10, 20, -10])
  const [reveal, setReveal] = useState(false)
  const [currentMoveCount, setCurrentMoveCount] = useState(1)
  const [isPlayersTurn, setIsPlayersTurn] = useState(true)
  const [level, setLevel] = useState(0)
  const [killed, setKilled] = useState([])

  const handleChange = (e) => setMove(prev => ({...prev, [e.target.name]: e.target.value}))

  const attack = (enemy) => {
    let currentAttacker = parseInt(move.attacker);
    let currentHero = parseInt(move.hero)
    if(currentAttacker>players.attacker){
      currentAttacker = players.attacker
    }
    if(currentHero>players.hero){
      currentHero = players.hero
    }
    const totalAttack = (currentAttacker*2)+currentHero
    setPlayers(prev => ({
      ...prev,
      attacker: prev.attacker-currentAttacker,
      hero: prev.hero-currentHero,
    }))

    setEnemies(prev => ({...prev, [enemy]: prev[enemy]-totalAttack}))
    setNotification(prev => [...prev, `Player attacked ${enemy} with ${totalAttack} points`])
    setMove({ attacker: 0, hero: 0 })
    
    if(totalAttack>=enemies[enemy]){
      setKilled([...killed, getIndex(enemy)])
      setNotification(prev => [...prev, `Players got chance move by killing a enemie`])
      setChance(true)
      setChanceCards(shuffle(chanceCards))
    }
    
    enemyAttack()
  }

  const heal = () => {
    if(players.healer>=(parseInt(move.attacker)+parseInt(move.hero))){
      setPlayers(prev => ({
        ...prev,
        attacker: prev.attacker+parseInt(move.attacker),
        hero: prev.hero+parseInt(move.hero),
        healer: prev.healer-(parseInt(move.attacker)+parseInt(move.hero)),
      }))
    }
    setMove({ attacker: 0, hero: 0 })
    setNotification(prev => [...prev, `Players used heal to add ${move.attacker} to Attacker and ${move.hero} to Hero`])

    enemyAttack()
  }

  const enemyAttack = () => {
    setIsPlayersTurn(false)
    setNotification(prev => [...prev, `Enemies turn`])

    setTimeout(() => {
      setPlayers(prev => ({
        ...prev,
        attacker: prev.attacker-parseInt(currentMoveCount),
        hero: prev.hero-parseInt(currentMoveCount),
        healer: prev.healer-parseInt(currentMoveCount),
      }))
      setNotification(prev => [...prev, `Enemies attacked with ${currentMoveCount}`])
    },2000)
    setCurrentMoveCount(prev => prev+1)

    setTimeout(() => {
      setIsPlayersTurn(true)
      setNotification(prev => [...prev, `Players turn`])
    }, 3000)
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const handleChance = (n) => {
    setReveal(true)

    setTimeout(() => setChance(false), 1000)
    setTimeout(() => setReveal(false), 2000)

    setTimeout(() => {
      setPlayers(prev => ({
        ...prev,
        attacker: prev.attacker+n,
        hero: prev.hero+n,
        healer: prev.healer+n,
      }))
      setNotification(prev => [...prev, `Players got ${n} from the chance move`])
    }, 3000)
  }
  
  useEffect(() => {
    if(killed.length===3){
      setNotification(prev => [...prev, `Level 1 completed`])
      setLevel(1)
      setPlayers(prev => ({
        ...prev,
        attacker: prev.attacker+5,
        hero: prev.healer+5,
        healer: prev.hero+10,
      }))
      setNotification(prev => [...prev, `Attacker and healer gets 5 and hero gets 10`])
    }
    if(killed.length===5){
      setNotification(prev => [...prev, `Level 2 completed`])
      setLevel(2)
      setPlayers(prev => ({
        ...prev,
        attacker: prev.attacker+10,
        hero: prev.healer+10,
        healer: prev.hero+15,
      }))
      setNotification(prev => [...prev, `Attacker and healer gets 10 and hero gets 15`])
    }
  }, [killed])

  return (
    <div className="App">
      <div className="current-count">
        Current Move Count:
        {currentMoveCount}
      </div>
      <div className="notification">
        {
          [...notification].reverse().map((n, i) => (
            <span key={i}>{n}</span>
          ))
        }
      </div>
      {
        enemies.boss<=0&&(
          <>
            <div className='bg-big' />
            <div className="modal">
              <h3>Players Win</h3>
              <p>
                <b>Attacker: </b> {players.attacker}
              </p>
              <p>
                <b>Healer: </b> {players.healer}
              </p>
              <p>
                <b>Hero: </b> {players.hero}
              </p>
              <button onClick={()=>window.location.reload()}>Restart</button>
            </div>
          </>
        )
      }
      {
        (players.attacker<=0&&players.healer<=0&&players.hero<=0)&&(
          <>
            <div className="bg-big" />
            <div className="modal">
              <h3>Enemies Won</h3>
              <button onClick={()=>window.location.reload()}>Restart</button>
            </div>
          </>
        )
      }
      {
        chance&&(
          <>
            <div className="bg-big"></div>
            <div className="modal">
              <div className="flex">
                {
                  chanceCards.map((cc, i) => (
                    <div className="choices" key={i}>
                      <div className="what-num" style={{ right: !reveal?'0':'-100%' }}>??</div>
                      <div className="num" style={{ right: reveal?'0':'-100%' }}>{cc}</div>
                      <button className="select-btn" onClick={()=>handleChance(cc)}>Select It</button>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        ) 
      }
      <div className="flex">
        <div>
          <div className="boss enemies">Boss [ {enemies.boss} ]</div>
          {
            (isPlayersTurn&&level===2&&killed.indexOf(5)===-1)&&
            <button onClick={()=>attack('boss')}>Attack It</button>
          }
        </div>
      </div>
      <div className="semi-bosses flex relative">
        {
          killed.length===5&&(
            <div className="level-complete">
              <h2>Level Complete</h2>
            </div>
          )
        }
        <div>
          <div className="semi-boss enemies">Semi boss A [ {enemies.semiBossA} ]</div>
          {
            (isPlayersTurn&&level===1&&killed.indexOf(3)===-1)&&
            <button onClick={()=>attack('semiBossA')}>Attack It</button>
          }
        </div>
        <div>
          <div className="semi-boss enemies">Semi boss B [ {enemies.semiBossB} ]</div>
          {
            (isPlayersTurn&&level===1&&killed.indexOf(4)===-1)&&
            <button onClick={()=>attack('semiBossB')}>Attack It</button>
          }
        </div>
      </div>
      <div className="minions flex relative">
        {
          killed.length>=3&&(
            <div className="level-complete">
              <h2>Level Complete</h2>
            </div>
          )
        }
        <div>
          <div className="minion enemies">Minion A [ {enemies.minionsA} ]</div>
          {
            (isPlayersTurn&&level===0&&killed.indexOf(0)===-1)&&
            <button onClick={()=>attack('minionsA')}>Attack It</button>
          }
        </div>
        <div>
          <div className="minion enemies">Minion B [ {enemies.minionsB} ]</div>
          {
            (isPlayersTurn&&level===0&&killed.indexOf(1)===-1)&&
            <button onClick={()=>attack('minionsB')}>Attack It</button>
          }
        </div>
        <div>
          <div className="minion enemies">Minion C [ {enemies.minionsC} ]</div>
          {
            (isPlayersTurn&&level===0&&killed.indexOf(2)===-1)&&
            <button onClick={()=>attack('minionsC')}>Attack It</button>
          }
        </div>
      </div>

      <div className="players flex">
        <div>
          <div className="attacker player">Attacker [ {players.attacker} ]</div>
          {
            isPlayersTurn&&
            <input type="number" value={move.attacker} name="attacker" onChange={handleChange} />
          }
        </div>
        <div>
          <div className="healer player">Healer [ {players.healer} ]</div>
          {
            (isPlayersTurn&&players.healer>0)&&
            <button onClick={heal}>Heal</button>
          }
        </div>
        <div>
          <div className="hero player">Hero [ {players.hero} ]</div>
          {
            isPlayersTurn&&
            <input type="number" value={move.hero} name="hero" onChange={handleChange} />
          }
        </div>
      </div>
    </div>
  );
}

export default App;

const getIndex = (enm) => {
  switch (enm) {
    case 'minionsA':
      return 0;
    case 'minionsB':
      return 1;
    case 'minionsC':
      return 2;
    case 'semiBossA':
      return 3;
    case 'semiBossB':
      return 4;
    case 'boss':
      return 5;
    default:
      break;
  }
}