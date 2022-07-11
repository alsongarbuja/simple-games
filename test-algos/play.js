"use strict";
var play = function (players) {
    var remainingCard = 51;
    var playerCards = divide(players, Math.floor(51 / players));
    console.info('Cards divided');
    console.info('Pairing cards are removed');
    for (var i = 0; i < players; i++) {
        playerCards[i] = removeMatches(playerCards[i]);
    }
    console.log(playerCards);
    var playerTurn = 0;
    var nextPlayer;
    var pickedIndex;
    while (remainingCard > 1) {
        console.log('while bhittra pugyo');
        var oldLength = playerCards[playerTurn].length;
        nextPlayer = getNextPlayer(playerTurn, players, playerCards);
        console.log(playerCards[playerTurn], playerTurn, playerCards[nextPlayer], nextPlayer);
        // pickedIndex = parseInt(prompt('Choose a card index')as string)
        // if(playerCards[nextPlayer].length!==0){
        var afterPick = pickCard(playerCards[playerTurn], playerCards[nextPlayer][0], playerCards[nextPlayer]);
        playerCards[playerTurn] = afterPick.ownNewCards;
        playerCards[nextPlayer] = afterPick.opponentNewCards;
        console.log(playerCards[playerTurn], oldLength, playerCards[nextPlayer]);
        // }else{
        //     nextPlayer = (nextPlayer+1)%players;
        //     continue;
        // }
        if (playerCards[playerTurn].length < oldLength) {
            remainingCard -= 2;
        }
        playerTurn = nextPlayer;
        if (playerCards[nextPlayer].length === 0)
            playerTurn = getNextPlayer(playerTurn, players, playerCards);
    }
    console.log('Game Finish');
    console.log(playerCards);
};
var getNextPlayer = function (currentPlayer, totalPlayers, playerCards) {
    var nextPlayer = (currentPlayer + 1) % totalPlayers;
    while (playerCards[nextPlayer].length === 0) {
        nextPlayer = (nextPlayer + 1) % totalPlayers;
    }
    return nextPlayer;
};
