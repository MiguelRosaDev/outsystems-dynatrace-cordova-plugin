"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizePath = exports.logPluginVersion = void 0;
var path_1 = require("path");
var Logger_1 = require("../logger/Logger");
var logPluginVersion = function (packageJson) {
    if (packageJson !== undefined && packageJson.version !== undefined) {
        Logger_1.Logger.getInstance().logInfo('Dynatrace Cordova Plugin - Version ' + packageJson.version);
    }
    else {
        Logger_1.Logger.getInstance().logWarning('Dynatrace Cordova Plugin - Version NOT READABLE');
    }
};
exports.logPluginVersion = logPluginVersion;
var sanitizePath = function (path) {
    if (path == null || (0, path_1.isAbsolute)(path)) {
        return path;
    }
    return (0, path_1.join)(process.cwd(), path);
};
exports.sanitizePath = sanitizePath;
