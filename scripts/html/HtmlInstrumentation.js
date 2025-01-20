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
exports.HTMLInstrumentation = void 0;
var Logger_1 = require("../logger/Logger");
var HtmlModifier_1 = require("./HtmlModifier");
var HtmlUtil_1 = require("./HtmlUtil");
var HTMLInstrumentation = (function () {
    function HTMLInstrumentation(folder, jsAgentContent, cookieProxySource, htmlPathsConfigured) {
        this.folder = folder;
        this.jsAgentContent = jsAgentContent;
        this.cookieProxySource = cookieProxySource;
        this.htmlPathsConfigured = htmlPathsConfigured;
    }
    HTMLInstrumentation.prototype.instrument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var htmlFiles, _a, _b, instrumentationLogMessage, _i, htmlFiles_1, htmlFile, htmlModifier;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, (0, HtmlUtil_1.searchHTMLFiles)(this.folder)];
                    case 1:
                        htmlFiles = _c.sent();
                        _b = (_a = htmlFiles).concat;
                        return [4, (0, HtmlUtil_1.checkHTMLPaths)(this.folder, this.htmlPathsConfigured)];
                    case 2:
                        htmlFiles = _b.apply(_a, [_c.sent()]);
                        if (!(htmlFiles.length === 0)) return [3, 3];
                        Logger_1.Logger.getInstance().logInfo('No HTML files to instrument!');
                        return [3, 8];
                    case 3:
                        instrumentationLogMessage = '\n\nSuccessfully added JSAgent ';
                        if (this.cookieProxySource !== undefined) {
                            if (this.cookieProxySource.includes('-cap.js')) {
                                instrumentationLogMessage = instrumentationLogMessage + 'and Capacitor Cookie Proxy to HTML file(s):';
                            }
                            else {
                                instrumentationLogMessage = instrumentationLogMessage + 'and Cookie Proxy to HTML file(s):';
                            }
                        }
                        else {
                            instrumentationLogMessage = instrumentationLogMessage + 'to HTML file(s):';
                        }
                        _i = 0, htmlFiles_1 = htmlFiles;
                        _c.label = 4;
                    case 4:
                        if (!(_i < htmlFiles_1.length)) return [3, 7];
                        htmlFile = htmlFiles_1[_i];
                        htmlModifier = new HtmlModifier_1.HTMLModifier(htmlFile);
                        htmlModifier.setJSAgentContent(this.jsAgentContent);
                        htmlModifier.setSwallowAPIEnabled(true);
                        htmlModifier.setCookieProxySource(this.cookieProxySource);
                        return [4, htmlModifier.modify()];
                    case 5:
                        _c.sent();
                        instrumentationLogMessage = instrumentationLogMessage + "\n\t".concat(htmlFile.getPath());
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3, 4];
                    case 7:
                        Logger_1.Logger.getInstance().logInfo(instrumentationLogMessage + '\n');
                        _c.label = 8;
                    case 8: return [2, htmlFiles];
                }
            });
        });
    };
    return HTMLInstrumentation;
}());
exports.HTMLInstrumentation = HTMLInstrumentation;
