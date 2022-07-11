"use strict";
var getArray = function (type, total) {
    if (type === void 0) { type = 'number'; }
    if (total === void 0) { total = 52; }
    var arr = [];
    if (type === 'number') {
        for (var i = 0; i < total; i++) {
            arr.push(i + 1);
        }
    }
    if (type === 'letter') {
        for (var i = 65; i <= 90; i++) {
            arr.push(String.fromCharCode(i));
        }
    }
    return arr;
};
