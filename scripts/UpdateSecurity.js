"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForPolicy = exports.updateSecurity = void 0;
var FileHelper_1 = require("./helpers/FileHelper");
var Logger_1 = require("./logger/Logger");
var SEC_POLICY_IDENTIFIER = 'Content-Security-Policy';
var HTML_IDENTIFIER = ['src="cordova.js"', '<ion-app>', '<app-root>'];
var HTML_REQUIRED = ['<!doctype html', '<html', '</html>', '<head', '</head>'];
var CONNECT_SRC = 'connect-src';
var updateSecurity = function (htmlFiles, configuration) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, htmlFiles_1, htmlFile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Logger_1.Logger.getInstance().logInfo('Successfully read the settings for modifying CSP');
                if (!configuration.getCordovaPluginConfiguration().isCSPUrlAvailable()) {
                    Logger_1.Logger.getInstance().logInfo('Updating the CSP is turned off!');
                    return [2, false];
                }
                try {
                    htmlFiles = htmlFiles.filter(function (value) { return (0, exports.checkForPolicy)(value.getPath()); });
                }
                catch (e) {
                    if (e instanceof Error) {
                        Logger_1.Logger.getInstance().logError('Error during updating CSP: ' + e.message);
                    }
                }
                if (!(htmlFiles.length > 0)) return [3, 5];
                _i = 0, htmlFiles_1 = htmlFiles;
                _a.label = 1;
            case 1:
                if (!(_i < htmlFiles_1.length)) return [3, 4];
                htmlFile = htmlFiles_1[_i];
                return [4, updateCSPInHtml(htmlFile.getPath(), configuration.getCordovaPluginConfiguration().getCSPUrl())];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3, 1];
            case 4: return [2, true];
            case 5:
                Logger_1.Logger.getInstance().logWarning("Will not update security policy as the plugin didn't find a html file containing csp.");
                return [2, false];
        }
    });
}); };
exports.updateSecurity = updateSecurity;
var updateCSPInHtml = function (htmlFile, cspURL) { return __awaiter(void 0, void 0, void 0, function () {
    var content, indexCSP, indexCSPEnd, indexCSPContentStart, indexCSPConnectSrc, newFileContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Logger_1.Logger.getInstance().logInfo('Updating the CSP to allow communication with the server!');
                return [4, (0, FileHelper_1.readTextFromFile)(htmlFile)];
            case 1:
                content = _a.sent();
                indexCSP = content.indexOf(SEC_POLICY_IDENTIFIER);
                indexCSPEnd = content.indexOf('">', indexCSP);
                indexCSPContentStart = content.indexOf('content=', indexCSP);
                if (indexCSPContentStart > indexCSPEnd) {
                    throw new Error('CSP not correctly formatted!');
                }
                indexCSPConnectSrc = content.indexOf(CONNECT_SRC, indexCSPContentStart);
                if (indexCSPConnectSrc === -1) {
                    newFileContent = content.slice(0, indexCSPEnd) + ' ' + CONNECT_SRC + ' ' + cspURL + ';' + content.slice(indexCSPEnd);
                }
                else {
                    newFileContent = content.slice(0, indexCSPConnectSrc + CONNECT_SRC.length) +
                        ' ' + cspURL + content.slice(indexCSPConnectSrc + CONNECT_SRC.length);
                }
                return [4, (0, FileHelper_1.writeTextToFile)(htmlFile, newFileContent)];
            case 2:
                _a.sent();
                Logger_1.Logger.getInstance().logInfo('Successfully updated the CSP: ' + htmlFile);
                return [2];
        }
    });
}); };
var checkForPolicy = function (htmlFile) {
    var content = (0, FileHelper_1.readTextFromFileSync)(htmlFile);
    if (content.indexOf(SEC_POLICY_IDENTIFIER) > -1) {
        for (var _i = 0, HTML_IDENTIFIER_1 = HTML_IDENTIFIER; _i < HTML_IDENTIFIER_1.length; _i++) {
            var identifer = HTML_IDENTIFIER_1[_i];
            if (content.toLowerCase().indexOf(identifer) > -1) {
                Logger_1.Logger.getInstance().logInfo('Successfully updated the CSP: ' + htmlFile);
                return true;
            }
        }
        if (HTML_REQUIRED.every(function (value) { return content.toLowerCase().includes(value); })) {
            Logger_1.Logger.getInstance().logInfo('Successfully updated the CSP: ' + htmlFile);
            return true;
        }
    }
    return false;
};
exports.checkForPolicy = checkForPolicy;
