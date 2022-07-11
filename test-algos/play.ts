const play = (players: number) => {
    let remainingCard = 51;
    const playerCards = divide(players, Math.floor(51/players));
    console.info('Cards divided')

    console.info('Pairing cards are removed')
    for (let i = 0; i < players; i++) {
        playerCards[i] = removeMatches(playerCards[i]);
    }
    console.log(playerCards)

    let playerTurn = 0;
    let nextPlayer: number;
    let pickedIndex: number;
    while (remainingCard > 1) {
        console.log('while bhittra pugyo');
        let oldLength = playerCards[playerTurn].length
        
        nextPlayer = getNextPlayer(playerTurn, players, playerCards);

        console.log(playerCards[playerTurn], playerTurn,playerCards[nextPlayer], nextPlayer);

        // pickedIndex = parseInt(prompt('Choose a card index')as string)
        // if(playerCards[nextPlayer].length!==0){
            const afterPick = pickCard(playerCards[playerTurn], playerCards[nextPlayer][0], playerCards[nextPlayer])
            playerCards[playerTurn] = afterPick.ownNewCards
            playerCards[nextPlayer] = afterPick.opponentNewCards
            
            console.log(playerCards[playerTurn],oldLength,playerCards[nextPlayer]);
        // }else{
        //     nextPlayer = (nextPlayer+1)%players;
        //     continue;
        // }
        if(playerCards[playerTurn].length<oldLength){
            remainingCard -= 2;
        }
        playerTurn = nextPlayer;
        
        if(playerCards[nextPlayer].length===0)
            playerTurn = getNextPlayer(playerTurn, players, playerCards)
        
    }

    console.log('Game Finish');
    console.log(playerCards);
    
}

const getNextPlayer = (currentPlayer: number, totalPlayers: number, playerCards: string[][]) => {
    let nextPlayer = (currentPlayer+1)%totalPlayers

    while(playerCards[nextPlayer].length===0){
        nextPlayer = (nextPlayer+1)%totalPlayers
    }

    return nextPlayer;
}