import { set } from "firebase/database";

// arrowkey pressed handler
export const arrowKeyPressedHandler = (event, players, playerId, ref) => {
    // character element

    if(event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 37 || event.keyCode === 39){
 
        const character = document.querySelector('.character');
        const characterRight = parseInt(window.getComputedStyle(character).right);
        const characterTop = parseInt(window.getComputedStyle(character).top);
        const newPlayer = players[playerId];
        
        // switch case for arrow keys pressed
        switch (event.keyCode) {
            case 38:
                character.style.right = `${characterRight + 30}px`;
                newPlayer.right = `${characterRight + 30}px`;
                break;
            case 40:
                character.style.right = `${characterRight - 30}px`;
                newPlayer.right = `${characterRight - 30}px`;
                break;
            case 37:
                character.style.top = `${characterTop + 30}px`;
                newPlayer.bottom = `${characterTop + 30}px`;
                break;
            case 39:
                character.style.top = `${characterTop - 30}px`;
                newPlayer.bottom = `${characterTop - 30}px`;
                break;
            default:
                break;
        }

        set(ref, newPlayer);
    }
}