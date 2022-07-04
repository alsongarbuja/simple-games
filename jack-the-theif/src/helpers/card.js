
export const deck = () => {
    return [
        "A ♠️", "2 ♠️", "3 ♠️", "4 ♠️", "5 ♠️", "6 ♠️", "7 ♠️", "8 ♠️", "9 ♠️", "10 ♠️", "J ♠️", "Q ♠️", "K ♠️",
        "A ♥️", "2 ♥️", "3 ♥️", "4 ♥️", "5 ♥️", "6 ♥️", "7 ♥️", "8 ♥️", "9 ♥️", "10 ♥️", "J ♥️", "Q ♥️", "K ♥️",
        "A ♦️", "2 ♦️", "3 ♦️", "4 ♦️", "5 ♦️", "6 ♦️", "7 ♦️", "8 ♦️", "9 ♦️", "10 ♦️", "J ♦️", "Q ♦️", "K ♦️",
        "A ♣️", "2 ♣️", "3 ♣️", "4 ♣️", "5 ♣️", "6 ♣️", "7 ♣️", "8 ♣️", "9 ♣️", "10 ♣️", "J ♣️", "Q ♣️", "K ♣️",
    ];
}

export const randomize = (options) => {
    let currentIndex = options.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [options[currentIndex], options[randomIndex]] = [options[randomIndex], options[currentIndex]]
    }

    return options;
}

export const shuffle = (deck) => randomize(deck)

export const divide = (players, perPlayerCards) => {
    const cards = shuffle(deck());
    let index = 0;
    let playerCards = [];
    let dividedCards = [];
    let remainingCards = 51-(perPlayerCards*players)

    for (let i = 0; i < players; i++) {
        for (let j = 0; j < perPlayerCards; j++) {
            playerCards.push(cards[index])
            index++;
        }
        dividedCards.push(playerCards)
        playerCards = [];
    }

    if(remainingCards!==0){
        for (let k = 0; k < players; k++) {
            if(remainingCards===0){
                break;
            }
            dividedCards[k].push(cards[index]);
            index++;
            remainingCards--;
        }
    }

    return dividedCards;
}

export const isMatch = (cardA, cardB) => cardA.split(" ")[0]===cardB.split(" ")[0];

export const removeMatches = (cards) => {
    let pairedCards = [];

    for (let i = 0; i < cards.length; i++) {
        for (let j = i+1; j < cards.length; j++) {
            if(isMatch(cards[i], cards[j])&&pairedCards.indexOf(i)===-1&&pairedCards.indexOf(j)===-1){
                pairedCards.push(i)
                pairedCards.push(j)
            }
        }
    }

    let newCards = [];

    for (let k = 0; k < cards.length; k++) {
        if(pairedCards.indexOf(k)===-1){
            newCards.push(cards[k]);
        }
    }

    return newCards;
}

export const pickCard = (ownCards, pickedCard, opponentCards) => {
    const totalCards = [...ownCards, pickedCard];
    const ownNewCards = removeMatches(totalCards);
    const opponentNewCards = opponentCards.filter(oc => oc!==pickedCard)

    return {
        ownNewCards,
        opponentNewCards,
    };
}