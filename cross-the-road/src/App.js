import { useEffect, useState } from 'react';
import './App.css';
import { arrowKeyPressedHandler } from './logic/keyHandler';

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, onDisconnect, onValue, onChildAdded, ref, set } from "firebase/database";
import { getRandomColor, getRandomName } from './helpers/random';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAMInaiJEDHmQyGB4iZ_45VCQEpEQY-ATY",
  authDomain: "cross-road-d7e8e.firebaseapp.com",
  projectId: "cross-road-d7e8e",
  storageBucket: "cross-road-d7e8e.appspot.com",
  messagingSenderId: "960936549572",
  appId: "1:960936549572:web:ef9605351ed39afe723d91",
  measurementId: "G-04FQRMRFXB",
  databaseURL: "https://cross-road-d7e8e-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

function App() {
  const [players, setPlayers] = useState([]);

  const initGame = () => {
    // onValue(players, (snapshot) => {
    //   const players = snapshot.val();
    //   if (players) {
    //     setPlayers(players);
    //   }
    // })

    onChildAdded(ref(database, 'players'), (snapshot) => {
      const player = snapshot.val();
      let isYou = false;
      if (player.id === auth.currentUser.uid) {
        isYou = true;
      }
      setPlayers(prev => ([
        ...prev,
        { [snapshot.key]: {
          ...player,
          isYou,
        } },
      ]));
    })
  }

  useEffect(() => {
    const arrowHandler = document.addEventListener('keydown', arrowKeyPressedHandler);

    let playerId;
    let playerRef;

    auth.onAuthStateChanged(user => {
      if(user){
        console.log(user);
        playerId = user.uid;
        playerRef = ref(database, `players/${playerId}`);

        const name = getRandomName()

        set(ref(database, `players/${playerId}`), {
          id: playerId,
          name,
          right: '10px',
          bottom: '20px',
          color: getRandomColor(),
        })

        onDisconnect(ref(database, `players/${playerId}`)).remove();

        initGame()
      }else{

      }
    })

    signInAnonymously(auth).catch(err => console.log(err))

    return () => {
      document.removeEventListener('keydown', arrowHandler);
    }
  }, []);

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
          players.map((player, index) => {
            const { id, name, right, bottom, color } = player[Object.keys(player)[0]];
            console.log(id, name, right, color);
            return (
              <div className="character" key={index} style={{
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
    </div>
  );
}

export default App;
