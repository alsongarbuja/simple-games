"use strict";
var random = function (min, max, isInteger) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = -1; }
    if (isInteger === void 0) { isInteger = true; }
    var randomNumber = 0;
    if (max === -1) {
        randomNumber = Math.random() * 1000;
    }
    else {
        randomNumber = Math.random() * (max - min + 1) + min;
    }
    if (isInteger) {
        randomNumber = Math.floor(randomNumber);
    }
    return randomNumber;
};
var randomizeAndPull = function (options) {
    var max = options.length;
    var index = random(0, max - 1);
    return options[index];
};
var randomize = function (options) {
    var _a;
    var currentIndex = options.length;
    var randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [options[randomIndex], options[currentIndex]], options[currentIndex] = _a[0], options[randomIndex] = _a[1];
    }
    return options;
};
