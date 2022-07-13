import { useEffect, useState } from 'react';
import './App.css';

import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, 
  onDisconnect, onValue, 
  onChildAdded, ref, set, 
  onChildRemoved, remove, update
} from "firebase/database";
import { getRandomColor, getRandomName } from './helpers/random';

import { FaArrowUp, FaArrowDown, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_PROJECT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);

  const [players, setPlayers] = useState({});
  const [playerId, setPlayerId] = useState('');
  const [playersRef] = useState(ref(database, 'players'));

  const initGame = () => {
    onValue(playersRef, (snapshot) => {
      setPlayers(snapshot.val());
    })

    onChildAdded(playersRef, (snapshot) => {
      const player = snapshot.val();
      setPlayers(prev => ({
        ...prev,
        [snapshot.key]: {
          ...player,
        },
     }));
    })

    onChildRemoved(playersRef, (snapshot) => {
      remove(playersRef, snapshot.key);
      const newPlayers = delete players[snapshot.key];
      setPlayers(newPlayers);
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        setPlayerId(user.uid);
        
        const name = getRandomName()

        set(ref(database, `players/${user.uid}`), {
          id: user.uid,
          name,
          right: '10px',
          bottom: Math.floor(Math.random()*(600 - 280+1) + 280)+'px',
          color: getRandomColor(),
        })

        onDisconnect(ref(database, `players/${user.uid}`)).remove();

        initGame()
      }else{

      }
    })

    signInAnonymously(auth).catch(err => console.log(err))
  // eslint-disable-next-line
  }, []);

  const handleTopArrow = () => {
    const character = document.querySelector('.you');
    const characterRight = parseInt(window.getComputedStyle(character).right);
    const newPlayer = players[playerId];

    character.style.right = `${characterRight + 30}px`;
    newPlayer.right = `${characterRight + 30}px`;

    update(ref(database, `players/${playerId}`), newPlayer);
  }

  const handleBottomArrow = () => {
    const character = document.querySelector('.you');
    const characterRight = parseInt(window.getComputedStyle(character).right);
    const newPlayer = players[playerId];

    character.style.right = `${characterRight - 30}px`;
    newPlayer.right = `${characterRight - 30}px`;
    
    set(ref(database, `players/${playerId}`), newPlayer);
  }

  const handleLeftArrow = () => {
    const character = document.querySelector('.you');
    const characterTop = parseInt(window.getComputedStyle(character).top);
    const newPlayer = players[playerId];

    character.style.top = `${characterTop + 30}px`;
    newPlayer.bottom = `${characterTop + 30}px`;

    set(ref(database, `players/${playerId}`), newPlayer);
  }

  const handleRightArrow = () => {
    const character = document.querySelector('.you');
    const characterTop = parseInt(window.getComputedStyle(character).top);
    const newPlayer = players[playerId];

    character.style.top = `${characterTop - 30}px`;
    newPlayer.bottom = `${characterTop - 30}px`;

    set(ref(database, `players/${playerId}`), newPlayer);
  }

  return (
    <div className="App">
      <div className="game-container background-container" style={{
        backgroundImage: `url(/assets/road-sprite.png)`,
      }}>
        <div className="car-container background-container" style={{
          backgroundImage: `url(/assets/car1-sprite.png)`,
          // gridRow: '1 / span 1',
          right: '15px',
          top: '120px',
        }}>
        </div>
        <div className="car-container background-container" style={{
          backgroundImage: `url(/assets/car1-sprite.png)`,
          // gridRow: '1 / span 1',
          right: '120px',
          top: '190px'
        }}>
        </div>
        {
          Object.keys(players).map((player) => {
            const { id, name, right, bottom, color } = players[player];
            return (
              <div className={`character ${playerId===player&&'you'}`} key={id} style={{
                backgroundColor: ""+color,
                right,
                bottom,
              }}>
                <div className="character-name">{name}</div>
              </div>
            )
          })
        }
      </div>
      <div className="controller">
        <div className="front">
          <button onClick={handleTopArrow}>
            <FaArrowUp />
          </button>
        </div>
        <div className="left">
          <button onClick={handleLeftArrow}>
            <FaArrowLeft />
          </button>
        </div>
        <div className="back">
          <button onClick={handleBottomArrow}>
            <FaArrowDown />
          </button>
        </div>
        <div className="right">
          <button onClick={handleRightArrow}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
