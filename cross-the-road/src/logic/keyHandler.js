// arrowkey pressed handler
export const arrowKeyPressedHandler = (event) => {
    // character element
    const character = document.querySelector('.character');
    const characterRight = parseInt(window.getComputedStyle(character).right);
    const characterTop = parseInt(window.getComputedStyle(character).top);

    // switch case for arrow keys pressed
    switch (event.keyCode) {
        case 38:
            character.style.right = `${characterRight + 30}px`;
            break;
        case 40:
            character.style.right = `${characterRight - 30}px`;
            break;
        case 37:
            character.style.top = `${characterTop + 30}px`;
            break;
        case 39:
            character.style.top = `${characterTop - 30}px`;
            break;
        default:
            break;
    }
}