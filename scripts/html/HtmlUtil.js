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
exports.removeOldDtAgent = exports.copyCookieProxy = exports.copySwallowAPI = exports.checkHTMLPaths = exports.searchHTMLFiles = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var FileHelper_1 = require("../helpers/FileHelper");
var Logger_1 = require("../logger/Logger");
var PathHelper_1 = require("../helpers/PathHelper");
var LogLevel_1 = require("../logger/LogLevel");
var HtmlReader_1 = require("./HtmlReader");
var HtmlVerifier_1 = require("./HtmlVerifier");
var searchHTMLFiles = function (folder) { return __awaiter(void 0, void 0, void 0, function () {
    var htmlFilesInstrumentable, htmlFiles, _i, htmlFiles_1, htmlFile, htmlReader, htmlFileContent, htmlVerifier, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Logger_1.Logger.getInstance().logInfo('Searching for HTML files ..');
                htmlFilesInstrumentable = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4, (0, FileHelper_1.searchFileExtInDirectoryNonRecursive)(folder, '.html', [])];
            case 2:
                htmlFiles = _a.sent();
                _i = 0, htmlFiles_1 = htmlFiles;
                _a.label = 3;
            case 3:
                if (!(_i < htmlFiles_1.length)) return [3, 7];
                htmlFile = htmlFiles_1[_i];
                htmlReader = new HtmlReader_1.default(htmlFile);
                return [4, htmlReader.isAvailable()];
            case 4:
                if (!_a.sent()) return [3, 6];
                return [4, htmlReader.read()];
            case 5:
                htmlFileContent = _a.sent();
                htmlVerifier = new HtmlVerifier_1.HTMLVerifier(htmlFileContent);
                if (htmlVerifier.isQualified()) {
                    htmlFilesInstrumentable.push(htmlFileContent);
                }
                _a.label = 6;
            case 6:
                _i++;
                return [3, 3];
            case 7: return [3, 9];
            case 8:
                error_1 = _a.sent();
                Logger_1.Logger.getInstance().logDebug('Error occured during HTML file search: ' + error_1, LogLevel_1.LogLevel.ERROR);
                return [3, 9];
            case 9: return [2, htmlFilesInstrumentable];
        }
    });
}); };
exports.searchHTMLFiles = searchHTMLFiles;
var checkHTMLPaths = function (assetsFolder, htmlPaths) { return __awaiter(void 0, void 0, void 0, function () {
    var checkedHTML, _i, htmlPaths_1, htmlPath, htmlPathToCheck, htmlReader, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                checkedHTML = [];
                _i = 0, htmlPaths_1 = htmlPaths;
                _c.label = 1;
            case 1:
                if (!(_i < htmlPaths_1.length)) return [3, 6];
                htmlPath = htmlPaths_1[_i];
                htmlPathToCheck = htmlPath;
                if (!(0, path_1.isAbsolute)(htmlPath)) {
                    htmlPathToCheck = (0, path_1.join)(assetsFolder, htmlPath);
                }
                htmlReader = new HtmlReader_1.default(htmlPathToCheck);
                return [4, htmlReader.isAvailable()];
            case 2:
                if (!!(_c.sent())) return [3, 3];
                Logger_1.Logger.getInstance().logDebug('Custom defined .html file could not be found: ' + htmlPathToCheck, LogLevel_1.LogLevel.ERROR);
                return [3, 5];
            case 3:
                _b = (_a = checkedHTML).push;
                return [4, htmlReader.read()];
            case 4:
                _b.apply(_a, [_c.sent()]);
                _c.label = 5;
            case 5:
                _i++;
                return [3, 1];
            case 6: return [2, checkedHTML];
        }
    });
}); };
exports.checkHTMLPaths = checkHTMLPaths;
var copySwallowAPI = function (destinationDirectory) { return __awaiter(void 0, void 0, void 0, function () {
    var destAssets, swallowApi, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, createAssetsDirectory(destinationDirectory)];
            case 1:
                destAssets = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4, (0, FileHelper_1.readTextFromFile)((0, PathHelper_1.getSwallowApiPath)())];
            case 3:
                swallowApi = _a.sent();
                return [4, (0, FileHelper_1.writeTextToFile)((0, path_1.resolve)(destAssets, PathHelper_1.FILE_SWALLOW_API), swallowApi)];
            case 4:
                _a.sent();
                return [3, 6];
            case 5:
                e_1 = _a.sent();
                Logger_1.Logger.getInstance().logError('Error while copying dtrum swallow api to platforms folder: ' + e_1);
                return [3, 6];
            case 6: return [2];
        }
    });
}); };
exports.copySwallowAPI = copySwallowAPI;
var copyCookieProxy = function (destinationDirectory, cookieProxyProps) { return __awaiter(void 0, void 0, void 0, function () {
    var destAssets, cookieProxy, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, createAssetsDirectory(destinationDirectory)];
            case 1:
                destAssets = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4, (0, FileHelper_1.readTextFromFile)(cookieProxyProps.path)];
            case 3:
                cookieProxy = _a.sent();
                return [4, (0, FileHelper_1.writeTextToFile)((0, path_1.resolve)(destAssets, cookieProxyProps.fileName), cookieProxy)];
            case 4:
                _a.sent();
                return [3, 6];
            case 5:
                e_2 = _a.sent();
                Logger_1.Logger.getInstance().logError(cookieProxyProps.errorLog + e_2);
                return [3, 6];
            case 6: return [2];
        }
    });
}); };
exports.copyCookieProxy = copyCookieProxy;
var createAssetsDirectory = function (destinationDirectory) { return __awaiter(void 0, void 0, void 0, function () {
    var destAssets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                destAssets = (0, path_1.join)(destinationDirectory, PathHelper_1.FOLDER_ASSETS);
                if (!!(0, fs_1.existsSync)(destAssets)) return [3, 2];
                return [4, (0, FileHelper_1.createDirectory)(destAssets)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2, destAssets];
        }
    });
}); };
var removeOldDtAgent = function (path) {
    try {
        (0, FileHelper_1.deleteFileSync)(path);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.removeOldDtAgent = removeOldDtAgent;
