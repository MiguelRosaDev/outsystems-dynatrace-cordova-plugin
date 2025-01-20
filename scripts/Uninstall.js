"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InstallHelper_1 = require("./helpers/InstallHelper");
module.exports = function (context) {
    return new Promise(function (resolve) {
        (0, InstallHelper_1.removeGradleModification)().then(function () { return (0, InstallHelper_1.removePListModification)(); }).then(function () {
            resolve('');
        });
    });
};
