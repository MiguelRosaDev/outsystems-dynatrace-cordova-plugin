"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCapacitorApp = exports.getCapacitorCookieProxyPath = exports.getCapacitorConfig = exports.getCapCliPackage = exports.getIosAssetsPathCapacitor = exports.getAndroidAssetsPathCapacitor = exports.getIosPlistPathCapacitor = exports.getAndroidPathCapacitor = exports.getIosPathCapacitor = exports.getDynatracePluginGradleFile = exports.getDynatraceGradleFile = exports.getLogPath = exports.getCurrentLogPath = exports.getCookieProxyPath = exports.getSwallowApiPath = exports.getDownloadJSAgentPath = exports.getIOSAssetsPath = exports.getAndroidAssetsPath = exports.getConfigFilePath = exports.getDefaultConfig = exports.getAndroidGradleVersionNewer = exports.getAndroidGradleVersion = exports.dynatraceConfigExists = exports.isIonic = exports.getIonicConfig = exports.getDoctorLogPath = exports.getAndroidGradleFile = exports.getPluginPath = exports.getPluginPackage = exports.getAndroidPath = exports.getIosPath = exports.getApplicationPackage = exports.getApplicationPath = exports.setRoot = exports.FILE_CAPACITOR_COOKIE_PROXY = exports.FILE_COOKIE_PROXY = exports.FILE_SWALLOW_API = exports.FILE_JSAGENT = exports.FOLDER_ASSETS = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var FOLDER_PLATFORMS = 'platforms';
exports.FOLDER_ASSETS = 'assets';
var FOLDER_WWW = 'www';
var FOLDER_SCRIPTS = 'scripts';
var FOLDER_FILES = 'files';
var FOLDER_LOGS = 'logs';
var FOLDER_ANDROID_APP = 'app';
var FOLDER_NODE_MODULES = 'node_modules';
var FILE_PACKAGE = 'package.json';
var FILE_CONFIG = 'dynatrace.config.js';
var FILE_CURRENT_LOG = 'currentLog.txt';
var FILE_CAPACITOR_CONFIG_TS = (0, path_1.join)(__dirname, '..', '..', '..', '..', '..', 'capacitor.config.ts');
var FILE_CAPACITOR_CONFIG_JSON = (0, path_1.join)(__dirname, '..', '..', '..', '..', '..', 'capacitor.config.json');
exports.FILE_JSAGENT = 'dtAgent.js';
exports.FILE_SWALLOW_API = 'dtrum-swallow-api.js';
exports.FILE_COOKIE_PROXY = 'dt-cookie-proxy.js';
exports.FILE_CAPACITOR_COOKIE_PROXY = 'dt-cookie-proxy-cap.js';
var rootPath = __dirname;
var setRoot = function (newRoot) {
    rootPath = (0, path_1.resolve)(newRoot);
};
exports.setRoot = setRoot;
var getPluginPath = function () { return (0, path_1.join)(rootPath, '..', '..'); };
exports.getPluginPath = getPluginPath;
var getDefaultConfig = function () { return (0, path_1.join)(getPluginPath(), FOLDER_FILES, 'default.config.js'); };
exports.getDefaultConfig = getDefaultConfig;
var getDynatraceGradleFile = function () { return (0, path_1.join)(getPluginPath(), FOLDER_FILES, 'dynatrace.gradle'); };
exports.getDynatraceGradleFile = getDynatraceGradleFile;
var getDynatracePluginGradleFile = function () { return (0, path_1.join)(getPluginPath(), FOLDER_FILES, 'plugin.gradle'); };
exports.getDynatracePluginGradleFile = getDynatracePluginGradleFile;
var getApplicationPath = function () {
    return (0, path_1.join)(getPluginPath(), '..', '..', '..');
};
exports.getApplicationPath = getApplicationPath;
var getPluginPackage = function () { return (0, path_1.join)(getPluginPath(), FILE_PACKAGE); };
exports.getPluginPackage = getPluginPackage;
var getApplicationPackage = function () { return (0, path_1.join)(getApplicationPath(), FILE_PACKAGE); };
exports.getApplicationPackage = getApplicationPackage;
var getCapCliPackage = function () { return (0, path_1.join)(getApplicationPath(), FOLDER_NODE_MODULES, '@capacitor', 'cli', FILE_PACKAGE); };
exports.getCapCliPackage = getCapCliPackage;
var getIosPath = function () { return isCapacitorApp() ? getIosPathCapacitor() : (0, path_1.join)(getApplicationPath(), FOLDER_PLATFORMS, 'ios'); };
exports.getIosPath = getIosPath;
var getAndroidPath = function () { return (0, path_1.join)(getApplicationPath(), FOLDER_PLATFORMS, 'android'); };
exports.getAndroidPath = getAndroidPath;
var getAndroidGradleFile = function (androidFolder) { return (0, path_1.join)(androidFolder, 'build.gradle'); };
exports.getAndroidGradleFile = getAndroidGradleFile;
var getConfigFilePath = function () { return (0, path_1.join)(getApplicationPath(), FILE_CONFIG); };
exports.getConfigFilePath = getConfigFilePath;
var getAndroidAssetsPath = function () {
    if (isCapacitorApp()) {
        if ((0, fs_1.existsSync)((0, path_1.join)(getAndroidPathCapacitor(), FOLDER_ANDROID_APP, 'src', 'main', exports.FOLDER_ASSETS, 'public'))) {
            return (0, path_1.join)(getAndroidPathCapacitor(), FOLDER_ANDROID_APP, 'src', 'main', exports.FOLDER_ASSETS, 'public');
        }
        else {
            return (0, path_1.join)(getAndroidPathCapacitor(), FOLDER_ANDROID_APP, 'src', 'main', exports.FOLDER_ASSETS, 'public');
        }
    }
    else {
        if ((0, fs_1.existsSync)((0, path_1.join)(getAndroidPath(), exports.FOLDER_ASSETS, FOLDER_WWW))) {
            return (0, path_1.join)(getAndroidPath(), exports.FOLDER_ASSETS, FOLDER_WWW);
        }
        else {
            return (0, path_1.join)(getAndroidPath(), FOLDER_ANDROID_APP, 'src', 'main', exports.FOLDER_ASSETS, FOLDER_WWW);
        }
    }
};
exports.getAndroidAssetsPath = getAndroidAssetsPath;
var getIOSAssetsPath = function () {
    if (isCapacitorApp()) {
        return getIosAssetsPathCapacitor();
    }
    else {
        return (0, path_1.join)(getIosPath(), FOLDER_WWW);
    }
};
exports.getIOSAssetsPath = getIOSAssetsPath;
var getDownloadJSAgentPath = function () { return (0, path_1.join)(getPluginPath(), FOLDER_FILES, exports.FILE_JSAGENT); };
exports.getDownloadJSAgentPath = getDownloadJSAgentPath;
var getSwallowApiPath = function () { return (0, path_1.join)(getPluginPath(), FOLDER_SCRIPTS, exports.FILE_SWALLOW_API); };
exports.getSwallowApiPath = getSwallowApiPath;
var getCookieProxyPath = function () { return (0, path_1.join)(getPluginPath(), FOLDER_SCRIPTS, 'snippets', exports.FILE_COOKIE_PROXY); };
exports.getCookieProxyPath = getCookieProxyPath;
var getCapacitorCookieProxyPath = function () { return (0, path_1.join)(getPluginPath(), FOLDER_SCRIPTS, 'snippets', exports.FILE_CAPACITOR_COOKIE_PROXY); };
exports.getCapacitorCookieProxyPath = getCapacitorCookieProxyPath;
var getCurrentLogPath = function () { return (0, path_1.join)(getLogPath(), FILE_CURRENT_LOG); };
exports.getCurrentLogPath = getCurrentLogPath;
var getLogPath = function () { return (0, path_1.join)(getPluginPath(), FOLDER_LOGS); };
exports.getLogPath = getLogPath;
var getDoctorLogPath = function () { return (0, path_1.join)(getPluginPath(), FOLDER_LOGS, 'currentDoctorDynatrace.txt'); };
exports.getDoctorLogPath = getDoctorLogPath;
var getAndroidGradleVersion = function () { return (0, path_1.join)(getAndroidPath(), 'cordova', 'lib', 'builders', 'ProjectBuilder.js'); };
exports.getAndroidGradleVersion = getAndroidGradleVersion;
var getAndroidGradleVersionNewer = function () { return (0, path_1.join)(getAndroidPath(), 'gradle', 'wrapper', 'gradle-wrapper.properties'); };
exports.getAndroidGradleVersionNewer = getAndroidGradleVersionNewer;
var getIonicConfig = function () { return (0, path_1.join)(getApplicationPath(), 'ionic.config.json'); };
exports.getIonicConfig = getIonicConfig;
var isIonic = function () { return (0, fs_1.existsSync)(getIonicConfig()); };
exports.isIonic = isIonic;
var dynatraceConfigExists = function () { return (0, fs_1.existsSync)(getConfigFilePath()); };
exports.dynatraceConfigExists = dynatraceConfigExists;
var getIosPathCapacitor = function () { return (0, path_1.join)(getApplicationPath(), 'ios', 'App'); };
exports.getIosPathCapacitor = getIosPathCapacitor;
var getAndroidPathCapacitor = function () { return (0, path_1.join)(getApplicationPath(), 'android'); };
exports.getAndroidPathCapacitor = getAndroidPathCapacitor;
var getIosPlistPathCapacitor = function () { return (0, path_1.join)(getIosPathCapacitor(), 'App', 'Info.plist'); };
exports.getIosPlistPathCapacitor = getIosPlistPathCapacitor;
var getAndroidAssetsPathCapacitor = function () {
    if ((0, fs_1.existsSync)((0, path_1.join)(getAndroidPathCapacitor(), FOLDER_ANDROID_APP, 'src', 'main', exports.FOLDER_ASSETS, 'public'))) {
        return (0, path_1.join)(getAndroidPathCapacitor(), FOLDER_ANDROID_APP, 'src', 'main', exports.FOLDER_ASSETS, 'public');
    }
    else {
        return (0, path_1.join)(getAndroidPathCapacitor(), FOLDER_ANDROID_APP, 'src', 'main', exports.FOLDER_ASSETS, 'public');
    }
};
exports.getAndroidAssetsPathCapacitor = getAndroidAssetsPathCapacitor;
var getIosAssetsPathCapacitor = function () {
    if ((0, fs_1.existsSync)((0, path_1.join)(getIosPathCapacitor(), 'public'))) {
        return (0, path_1.join)(getIosPathCapacitor(), 'public');
    }
    else if ((0, fs_1.existsSync)((0, path_1.join)(getIosPathCapacitor(), 'App', 'public'))) {
        return (0, path_1.join)(getIosPathCapacitor(), 'App', 'public');
    }
    return undefined;
};
exports.getIosAssetsPathCapacitor = getIosAssetsPathCapacitor;
var getCapacitorConfig = function (checkForTs) {
    if ((0, fs_1.existsSync)(FILE_CAPACITOR_CONFIG_TS) || checkForTs === true) {
        return FILE_CAPACITOR_CONFIG_TS;
    }
    else if ((0, fs_1.existsSync)(FILE_CAPACITOR_CONFIG_JSON)) {
        return FILE_CAPACITOR_CONFIG_JSON;
    }
    return '';
};
exports.getCapacitorConfig = getCapacitorConfig;
var isCapacitorApp = function () { return (0, fs_1.existsSync)(getCapacitorConfig()) || (0, fs_1.existsSync)(getCapacitorConfig(true)); };
exports.isCapacitorApp = isCapacitorApp;
var isNpxCommand = function () { return (0, fs_1.existsSync)((0, path_1.join)(__dirname, '..', '..', '..', '..', '..', 'package.json')) && __dirname.includes('node_modules'); };
