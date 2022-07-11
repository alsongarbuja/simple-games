"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var deck = function () {
    return [
        "A ♠️", "2 ♠️", "3 ♠️", "4 ♠️", "5 ♠️", "6 ♠️", "7 ♠️", "8 ♠️", "9 ♠️", "10 ♠️", "J ♠️", "Q ♠️", "K ♠️",
        "A ♥️", "2 ♥️", "3 ♥️", "4 ♥️", "5 ♥️", "6 ♥️", "7 ♥️", "8 ♥️", "9 ♥️", "10 ♥️", "J ♥️", "Q ♥️", "K ♥️",
        "A ♦️", "2 ♦️", "3 ♦️", "4 ♦️", "5 ♦️", "6 ♦️", "7 ♦️", "8 ♦️", "9 ♦️", "10 ♦️", "J ♦️", "Q ♦️", "K ♦️",
        "A ♣️", "2 ♣️", "3 ♣️", "4 ♣️", "5 ♣️", "6 ♣️", "7 ♣️", "8 ♣️", "9 ♣️", "10 ♣️", "J ♣️", "Q ♣️", "K ♣️",
    ];
};
var shuffle = function (deck) { return randomize(deck); };
var divide = function (players, perPlayerCards) {
    var cards = shuffle(deck());
    var index = 0;
    var playerCards = [];
    var dividedCards = [];
    var isAllCardDivided = perPlayerCards * players === 51;
    for (var i = 0; i < players; i++) {
        for (var j = 0; j < perPlayerCards; j++) {
            playerCards.push(cards[index]);
            index++;
        }
        dividedCards.push(playerCards);
        playerCards = [];
    }
    if (!isAllCardDivided) {
        var remainingCards = 51 - (perPlayerCards * players);
        for (var k = players * perPlayerCards; k < remainingCards; k++) {
            dividedCards[k].push(cards[index]);
        }
    }
    return dividedCards;
};
var isMatch = function (cardA, cardB) { return cardA.split(" ")[0] === cardB.split(" ")[0]; };
var removeMatches = function (cards) {
    var pairedCards = [];
    for (var i = 0; i < cards.length; i++) {
        var numberOfPairs = 0;
        for (var j = i + 1; j < cards.length; j++) {
            if (isMatch(cards[i], cards[j]) && pairedCards.indexOf(cards[i].split(" ")[0]) === -1) {
                numberOfPairs += 2;
                break;
            }
        }
        if (numberOfPairs != 0 && numberOfPairs % 2 === 0)
            pairedCards.push(cards[i].split(" ")[0]);
    }
    var newCards = [];
    var p = 1;
    for (var k = 0; k < cards.length; k++) {
        if (pairedCards.indexOf(cards[k].split(" ")[0]) === -1) {
            newCards.push(cards[k]);
        }
        else {
            p++;
        }
        if (p > 2) {
            p = 1;
        }
    }
    return newCards;
};
var pickCard = function (ownCards, pickedCard, opponentCards) {
    var totalCards = __spreadArray(__spreadArray([], ownCards, true), [pickedCard], false);
    var ownNewCards = removeMatches(totalCards);
    var opponentNewCards = opponentCards.filter(function (oc) { return oc !== pickedCard; });
    return {
        ownNewCards: ownNewCards,
        opponentNewCards: opponentNewCards,
    };
};
