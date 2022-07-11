
const deck = () => {
    return [
        "A ♠️", "2 ♠️", "3 ♠️", "4 ♠️", "5 ♠️", "6 ♠️", "7 ♠️", "8 ♠️", "9 ♠️", "10 ♠️", "J ♠️", "Q ♠️", "K ♠️",
        "A ♥️", "2 ♥️", "3 ♥️", "4 ♥️", "5 ♥️", "6 ♥️", "7 ♥️", "8 ♥️", "9 ♥️", "10 ♥️", "J ♥️", "Q ♥️", "K ♥️",
        "A ♦️", "2 ♦️", "3 ♦️", "4 ♦️", "5 ♦️", "6 ♦️", "7 ♦️", "8 ♦️", "9 ♦️", "10 ♦️", "J ♦️", "Q ♦️", "K ♦️",
        "A ♣️", "2 ♣️", "3 ♣️", "4 ♣️", "5 ♣️", "6 ♣️", "7 ♣️", "8 ♣️", "9 ♣️", "10 ♣️", "J ♣️", "Q ♣️", "K ♣️",
    ];
}

const shuffle = (deck: string[]) => randomize(deck)

const divide = (players: number, perPlayerCards: number): string[][] => {
    const cards = shuffle(deck());
    let index = 0;
    let playerCards = [];
    let dividedCards: string[][] = [];
    const isAllCardDivided = perPlayerCards*players===51

    for (let i = 0; i < players; i++) {
        for (let j = 0; j < perPlayerCards; j++) {
            playerCards.push(cards[index])
            index++;
        }
        dividedCards.push(playerCards)
        playerCards = [];
    }

    if(!isAllCardDivided){
        const remainingCards = 51-(perPlayerCards*players)

        for (let k = players*perPlayerCards; k < remainingCards; k++) {
            dividedCards[k].push(cards[index])            
        }
    }

    return dividedCards;
}

const isMatch = (cardA: string, cardB: string): boolean => cardA.split(" ")[0]===cardB.split(" ")[0];

const removeMatches = (cards: string[]) => {
    let pairedCards = [];

    for (let i = 0; i < cards.length; i++) {
        let numberOfPairs = 0;
        for (let j = i+1; j < cards.length; j++) {
            if(isMatch(cards[i], cards[j])&&pairedCards.indexOf(cards[i].split(" ")[0])===-1){
                numberOfPairs += 2;
                break;
            }
        }
        if(numberOfPairs!=0&&numberOfPairs%2===0)
            pairedCards.push(cards[i].split(" ")[0])
    }

    let newCards = [];
    let p = 1;

    for (let k = 0; k < cards.length; k++) {
        if(pairedCards.indexOf(cards[k].split(" ")[0])===-1){
            newCards.push(cards[k]);
        }else{
            p++;
        }
        if(p>2){
            p = 1;
        }
    }
    
    return newCards;
}

const pickCard = (ownCards: string[], pickedCard: string, opponentCards: string[]) => {
    const totalCards = [...ownCards, pickedCard];
    const ownNewCards = removeMatches(totalCards);
    const opponentNewCards = opponentCards.filter(oc => oc!==pickedCard)

    return {
        ownNewCards,
        opponentNewCards,
    };
}