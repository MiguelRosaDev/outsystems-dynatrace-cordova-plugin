"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogger = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var FileHelper_1 = require("../helpers/FileHelper");
var PathHelper_1 = require("../helpers/PathHelper");
var BaseLogger_1 = require("./BaseLogger");
var LogUtil_1 = require("./LogUtil");
var LogLevel_1 = require("./LogLevel");
var FileLogger = (function (_super) {
    __extends(FileLogger, _super);
    function FileLogger(debugEnabled) {
        return _super.call(this, debugEnabled) || this;
    }
    FileLogger.prototype.logInfo = function (message) {
        return this.log(message, LogLevel_1.LogLevel.INFO);
    };
    FileLogger.prototype.logWarning = function (message) {
        return this.log(message, LogLevel_1.LogLevel.WARNING);
    };
    FileLogger.prototype.logError = function (message) {
        return this.log(message, LogLevel_1.LogLevel.ERROR);
    };
    FileLogger.prototype.log = function (message, logLevel) {
        var logMessage = _super.prototype.log.call(this, message, logLevel);
        try {
            this.createLogPath();
            (0, FileHelper_1.appendFileSync)(this.getFileLocation(), "".concat(logMessage, "\r\n"));
        }
        catch (error) {
            _super.prototype.log.call(this, "Could not log to File: ".concat((0, PathHelper_1.getCurrentLogPath)()), LogLevel_1.LogLevel.WARNING);
        }
        return logMessage;
    };
    FileLogger.prototype.logDebug = function (message, logLevel) {
        if (this.debugEnabled) {
            return this.log(message, logLevel);
        }
    };
    FileLogger.prototype.getFileLocation = function () {
        return (0, PathHelper_1.getCurrentLogPath)();
    };
    FileLogger.prototype.closeLogger = function () {
        var logFileName = (0, LogUtil_1.currentDate)().split(':').join('-') + '.txt';
        try {
            if ((0, fs_1.existsSync)((0, PathHelper_1.getCurrentLogPath)()) && !(0, fs_1.existsSync)((0, path_1.join)((0, PathHelper_1.getLogPath)(), logFileName))) {
                (0, FileHelper_1.renameFileSync)((0, PathHelper_1.getCurrentLogPath)(), (0, path_1.join)((0, PathHelper_1.getLogPath)(), logFileName));
            }
        }
        catch (error) {
        }
    };
    FileLogger.prototype.createLogPath = function () {
        if (!(0, fs_1.existsSync)((0, PathHelper_1.getLogPath)())) {
            (0, FileHelper_1.createDirectorySync)((0, PathHelper_1.getLogPath)());
        }
    };
    return FileLogger;
}(BaseLogger_1.BaseLogger));
exports.FileLogger = FileLogger;
