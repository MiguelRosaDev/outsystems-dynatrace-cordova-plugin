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
exports.instrument = exports.cookieProxyToInject = exports.isCapacitorCookiesEnabled = exports.parseCommandLine = exports.CONFIG_JSAGENT_FILE = exports.CONFIG_FILE = exports.CONFIG_PLIST_FILE = exports.CONFIG_GRADLE_FILE = void 0;
var path_1 = require("path");
var Android_1 = require("../Android");
var ConfigurationReader_1 = require("../config/ConfigurationReader");
var DownloadAgent_1 = require("../DownloadAgent");
var HtmlUtil_1 = require("../html/HtmlUtil");
var HtmlInstrumentation_1 = require("../html/HtmlInstrumentation");
var InstrumentUtil_1 = require("../utils/InstrumentUtil");
var Ios_1 = require("../Ios");
var Logger_1 = require("../logger/Logger");
var UpdateSecurity_1 = require("../UpdateSecurity");
var LoggerType_1 = require("../logger/LoggerType");
var PluginUtil_1 = require("../utils/PluginUtil");
var InstallHelper_1 = require("./InstallHelper");
var PathHelper_1 = require("./PathHelper");
var FileHelper_1 = require("./FileHelper");
var instrumentHelper = require("./InstrumentHelper");
var HtmlConstants_1 = require("../html/HtmlConstants");
exports.CONFIG_GRADLE_FILE = '--gradle';
exports.CONFIG_PLIST_FILE = '--plist';
exports.CONFIG_FILE = '--config';
exports.CONFIG_JSAGENT_FILE = '--jsagent';
var parseCommandLine = function (inputArgs) {
    var parsedArgs = {};
    inputArgs.forEach(function (entry) {
        var parts = entry.split('=');
        if (parts.length === 2) {
            switch (parts[0]) {
                case exports.CONFIG_GRADLE_FILE:
                    parsedArgs.gradle = parts[1];
                    break;
                case exports.CONFIG_FILE:
                    parsedArgs.config = parts[1];
                    break;
                case exports.CONFIG_PLIST_FILE:
                    parsedArgs.plist = parts[1];
                    break;
                case exports.CONFIG_JSAGENT_FILE:
                    parsedArgs.jsagent = parts[1];
                    break;
            }
        }
    });
    return parsedArgs;
};
exports.parseCommandLine = parseCommandLine;
function isCapacitorCookiesEnabled(path) {
    return __awaiter(this, void 0, void 0, function () {
        var capConfigContent, _a, capCookiesIndex, capConfig, i, capCookiesEnabled, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (!path) return [3, 2];
                    return [4, (0, FileHelper_1.readTextFromFile)(path)];
                case 1:
                    _a = _b.sent();
                    return [3, 4];
                case 2: return [4, (0, FileHelper_1.readTextFromFile)((0, PathHelper_1.getCapacitorConfig)())];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    capConfigContent = _a;
                    capCookiesIndex = capConfigContent.indexOf("CapacitorCookies");
                    if (capCookiesIndex > -1) {
                        capConfig = capConfigContent.substring(capCookiesIndex, capConfigContent.indexOf("}", capCookiesIndex)).split("\n");
                        for (i = 0; i < capConfig.length; i++) {
                            if (capConfig[i].includes("enabled")) {
                                capCookiesEnabled = capConfig[i].includes("true") ? true : false;
                                if (capCookiesEnabled === true) {
                                    Logger_1.Logger.getInstance().logWarning("Capacitor config file found! CapacitorCookies is enabled so we will not inject the cookie proxy! Please see https://www.npmjs.com/package/@dynatrace/cordova-plugin#capacitor-cookie-proxy for more information!");
                                }
                                return [2, capConfig[i].includes("true") ? true : false];
                            }
                        }
                    }
                    return [3, 6];
                case 5:
                    e_1 = _b.sent();
                    Logger_1.Logger.getInstance().logWarning("Capacitor config file is not available - Cannot check CapacitorCookies!");
                    return [3, 6];
                case 6: return [2, false];
            }
        });
    });
}
exports.isCapacitorCookiesEnabled = isCapacitorCookiesEnabled;
var cookieProxyToInject = function (isCapacitor, isCapacitorCookiesEnabled, cordovaConfig) {
    if (isCapacitor) {
        return !isCapacitorCookiesEnabled && cordovaConfig.isCapacitorCookieProxyEnabled()
            ? HtmlConstants_1.CAPACITOR_COOKIE_PROXY_SRC
            : !isCapacitorCookiesEnabled && cordovaConfig.isCookieProxyEnabled() && !cordovaConfig.isCapacitorCookieProxyEnabled()
                ? HtmlConstants_1.COOKIE_PROXY_SRC
                : undefined;
    }
    return cordovaConfig.isCookieProxyEnabled() === true ? HtmlConstants_1.COOKIE_PROXY_SRC : undefined;
};
exports.cookieProxyToInject = cookieProxyToInject;
var instrument = function (process) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cliBuildArgs, jsagentContent, configJson, isCapCookiesEnabled, buildProperties, htmlFiles, _b, htmlInstrumentation, _c, e_2, htmlInstrumentation, _d, e_3, e_4;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                Logger_1.Logger.getInstance().logInfo('Starting Configuration of application ..');
                _a = PluginUtil_1.logPluginVersion;
                return [4, (0, InstallHelper_1.parsedPluginPackageJson)()];
            case 1:
                _a.apply(void 0, [_e.sent()]);
                cliBuildArgs = (0, InstrumentUtil_1.setCliBuildArgs)(process);
                buildProperties = (0, InstrumentUtil_1.setBuildProperties)(instrumentHelper.parseCommandLine(process.argv.slice(2)));
                if (!((buildProperties.iosAvailable === true) || (buildProperties.androidAvailable === true))) return [3, 29];
                if (buildProperties.isCapacitor === false) {
                    (0, HtmlUtil_1.removeOldDtAgent)((0, PathHelper_1.getDownloadJSAgentPath)());
                }
                _e.label = 2;
            case 2:
                _e.trys.push([2, 27, , 28]);
                Logger_1.Logger.getInstance().logInfo('Trying to read configuration file: ' + buildProperties.pathToConfig);
                if (!(buildProperties.pathToConfig !== undefined)) return [3, 26];
                configJson = new ConfigurationReader_1.ConfigurationReader().readConfiguration(buildProperties.pathToConfig);
                Logger_1.Logger.setType(LoggerType_1.LoggerType.FileLogger, configJson.getCordovaPluginConfiguration().isDebugEnabled());
                if (!(buildProperties.pathToJsAgent !== undefined)) return [3, 4];
                Logger_1.Logger.getInstance().logInfo('Checking if JSAgent file exists at custom path ..');
                return [4, (0, FileHelper_1.readTextFromFile)(buildProperties.pathToJsAgent)];
            case 3:
                jsagentContent = _e.sent();
                return [3, 6];
            case 4: return [4, (0, DownloadAgent_1.downloadAgent)(configJson)];
            case 5:
                jsagentContent = _e.sent();
                _e.label = 6;
            case 6:
                htmlFiles = [];
                if (!(buildProperties.isCapacitor === true)) return [3, 8];
                return [4, isCapacitorCookiesEnabled()];
            case 7:
                _b = _e.sent();
                return [3, 9];
            case 8:
                _b = false;
                _e.label = 9;
            case 9:
                isCapCookiesEnabled = _b;
                if (configJson.getJavaScriptAgentConfiguration() !== undefined) {
                    htmlFiles = configJson.getJavaScriptAgentConfiguration().getHtmlFiles();
                }
                if (!((buildProperties.androidAvailable === true) &&
                    ((cliBuildArgs.android === true) || cliBuildArgs.capacitor === 'android'))) return [3, 17];
                _e.label = 10;
            case 10:
                _e.trys.push([10, 15, 16, 17]);
                Logger_1.Logger.getInstance().logInfo('Starting Android Configuration with Dynatrace!');
                if (buildProperties.pathToGradle != null) {
                    (0, Android_1.instrumentAndroidPlatform)(buildProperties.pathToGradle, false);
                }
                (0, Android_1.writeGradleConfig)(configJson.getAndroidConfiguration());
                buildProperties.androidAssetPath = (buildProperties.isCapacitor === true) ?
                    (0, PathHelper_1.getAndroidAssetsPathCapacitor)() : (0, PathHelper_1.getAndroidAssetsPath)();
                if ((buildProperties.isCapacitor === false) && buildProperties.androidAssetPath) {
                    (0, HtmlUtil_1.removeOldDtAgent)((0, path_1.join)(buildProperties.androidAssetPath, 'assets', 'dtAgent.js'));
                }
                if (!(jsagentContent === undefined)) return [3, 11];
                Logger_1.Logger.getInstance()
                    .logWarning('Not instrumenting HTML files since there is no available JSAgent to inject!');
                return [3, 14];
            case 11:
                htmlInstrumentation = new HtmlInstrumentation_1.HTMLInstrumentation(buildProperties.androidAssetPath, jsagentContent, (0, exports.cookieProxyToInject)(buildProperties.isCapacitor, isCapCookiesEnabled, configJson.getCordovaPluginConfiguration()), htmlFiles);
                _c = UpdateSecurity_1.updateSecurity;
                return [4, htmlInstrumentation.instrument()];
            case 12: return [4, _c.apply(void 0, [_e.sent(), configJson])];
            case 13:
                _e.sent();
                _e.label = 14;
            case 14: return [3, 17];
            case 15:
                e_2 = _e.sent();
                if (e_2 instanceof Error) {
                    Logger_1.Logger.getInstance().logError(e_2.message);
                }
                return [3, 17];
            case 16:
                Logger_1.Logger.getInstance().logInfo('Finished Android Configuration with Dynatrace!');
                return [7];
            case 17:
                if (!((buildProperties.iosAvailable === true) && ((cliBuildArgs.ios === true) || cliBuildArgs.capacitor === 'ios'))) return [3, 26];
                _e.label = 18;
            case 18:
                _e.trys.push([18, 24, 25, 26]);
                Logger_1.Logger.getInstance().logInfo('Starting iOS Configuration with Dynatrace!');
                return [4, (0, Ios_1.modifyPListFile)(buildProperties.pathToPList, configJson.getIosConfiguration(), false)];
            case 19:
                _e.sent();
                buildProperties.iosAssetsPath = (0, PathHelper_1.getIOSAssetsPath)();
                if ((buildProperties.isCapacitor === false) && buildProperties.iosAssetsPath !== undefined) {
                    (0, HtmlUtil_1.removeOldDtAgent)((0, path_1.join)(buildProperties.iosAssetsPath, 'assets', 'dtAgent.js'));
                }
                if (!(jsagentContent === undefined)) return [3, 20];
                Logger_1.Logger.getInstance().
                    logWarning('Not instrumenting HTML files since there is no available JSAgent to inject!');
                return [3, 23];
            case 20:
                if (!(buildProperties.iosAssetsPath !== undefined)) return [3, 23];
                htmlInstrumentation = new HtmlInstrumentation_1.HTMLInstrumentation(buildProperties.iosAssetsPath, jsagentContent, (0, exports.cookieProxyToInject)(buildProperties.isCapacitor, isCapCookiesEnabled, configJson.getCordovaPluginConfiguration()), htmlFiles);
                _d = UpdateSecurity_1.updateSecurity;
                return [4, htmlInstrumentation.instrument()];
            case 21: return [4, _d.apply(void 0, [_e.sent(), configJson])];
            case 22:
                _e.sent();
                _e.label = 23;
            case 23: return [3, 26];
            case 24:
                e_3 = _e.sent();
                if (e_3 instanceof Error) {
                    Logger_1.Logger.getInstance().logError(e_3.message);
                }
                return [3, 26];
            case 25:
                Logger_1.Logger.getInstance().logInfo('Finished iOS Configuration with Dynatrace!');
                return [7];
            case 26: return [3, 28];
            case 27:
                e_4 = _e.sent();
                if (e_4 instanceof Error) {
                    Logger_1.Logger.getInstance().logError(e_4.message);
                }
                if (e_4 instanceof DownloadAgent_1.StopBuildError) {
                    throw e_4;
                }
                return [3, 28];
            case 28: return [3, 30];
            case 29:
                Logger_1.Logger.getInstance().logWarning('Both Android and iOS Folder are not available - Skip Configuration.');
                _e.label = 30;
            case 30:
                Logger_1.Logger.getInstance().logInfo('Finished Configuration of Cordova application ..');
                Logger_1.Logger.getInstance().closeLogger();
                return [2];
        }
    });
}); };
exports.instrument = instrument;
