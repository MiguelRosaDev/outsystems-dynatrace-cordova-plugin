"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigurationUtil_1 = require("./config/ConfigurationUtil");
module.exports = function (context) { return new Promise(function (resolve) {
    (0, ConfigurationUtil_1.checkConfiguration)().then(function () {
        resolve('');
    });
}); };
