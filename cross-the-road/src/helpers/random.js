import { colors, names, sirnames } from "./data";

export const getRandomFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

export const getRandomName = () => {
    return getRandomFromArray(names)+" "+getRandomFromArray(sirnames);
}

export const getRandomColor = () => {
    return getRandomFromArray(colors);
}