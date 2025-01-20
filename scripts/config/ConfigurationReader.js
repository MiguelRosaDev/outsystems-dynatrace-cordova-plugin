"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationReader = void 0;
var DownloadAgent_1 = require("../DownloadAgent");
var PluginUtil_1 = require("../utils/PluginUtil");
var ConfigurationDefaults_1 = require("./ConfigurationDefaults");
var CordovaPluginConfigurationBuilder_1 = require("./cordova/CordovaPluginConfigurationBuilder");
var MobileAgentConfiguration_1 = require("./mobile/MobileAgentConfiguration");
var JavaScriptAgentConfigurationBuilder_1 = require("./javascript/JavaScriptAgentConfigurationBuilder");
var ConfigurationBuilder_1 = require("./ConfigurationBuilder");
var ConfigurationReader = (function () {
    function ConfigurationReader() {
    }
    ConfigurationReader.prototype.readConfiguration = function (pathToConfiguration) {
        var readConfig;
        try {
            readConfig = require(pathToConfiguration);
        }
        catch (e) {
            throw new DownloadAgent_1.StopBuildError(ConfigurationDefaults_1.ERROR_CONFIG_NOT_AVAILABLE);
        }
        if (readConfig === undefined) {
            throw new DownloadAgent_1.StopBuildError(ConfigurationDefaults_1.ERROR_CONFIG_NOT_AVAILABLE);
        }
        return this.parseConfiguration(readConfig);
    };
    ConfigurationReader.prototype.parseConfiguration = function (rawConfiguration) {
        var configurationBuilder = new ConfigurationBuilder_1.ConfigurationBuilder(this.parseCordovaConfiguration(rawConfiguration));
        configurationBuilder.setAndroidAgentConfiguration(this.parseAndroidConfiguration(rawConfiguration));
        configurationBuilder.setIosAgentConfiguration(this.parseIosConfiguration(rawConfiguration));
        configurationBuilder.setJavaScriptAgentConfiguration(this.parseJavaScriptConfiguration(rawConfiguration));
        return configurationBuilder.build();
    };
    ConfigurationReader.prototype.parseCordovaConfiguration = function (rawConfig) {
        var cordovaConfigurationBuilder = new CordovaPluginConfigurationBuilder_1.CordovaPluginConfigurationBuilder();
        if (rawConfig.cordova !== undefined) {
            cordovaConfigurationBuilder.setDebugMode(Boolean(rawConfig.cordova.debug));
            cordovaConfigurationBuilder.setCSPUrl(rawConfig.cordova.cspURL);
            cordovaConfigurationBuilder.setCookieProxy(Boolean(rawConfig.cordova.cookieProxy));
            cordovaConfigurationBuilder.setCapacitorCookieProxy(Boolean(rawConfig.cordova.capacitorCookieProxy));
            cordovaConfigurationBuilder.setJsAgentPath((0, PluginUtil_1.sanitizePath)(rawConfig.cordova.jsAgentPath));
            cordovaConfigurationBuilder.setGradlePath((0, PluginUtil_1.sanitizePath)(rawConfig.cordova.gradlePath));
            cordovaConfigurationBuilder.setPlistPath((0, PluginUtil_1.sanitizePath)(rawConfig.cordova.plistPath));
        }
        return cordovaConfigurationBuilder.build();
    };
    ConfigurationReader.prototype.parseAndroidConfiguration = function (rawConfig) {
        var _a, _b;
        if (((_b = (_a = rawConfig === null || rawConfig === void 0 ? void 0 : rawConfig.android) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.length) !== undefined
            && rawConfig.android.config.length > 0) {
            return new MobileAgentConfiguration_1.MobileAgentConfiguration(rawConfig.android.config);
        }
        return new MobileAgentConfiguration_1.MobileAgentConfiguration(undefined);
    };
    ConfigurationReader.prototype.parseIosConfiguration = function (rawConfig) {
        var _a, _b, _c, _d;
        if (((_b = (_a = rawConfig === null || rawConfig === void 0 ? void 0 : rawConfig.ios) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.length) !== undefined && ((_d = (_c = rawConfig === null || rawConfig === void 0 ? void 0 : rawConfig.ios) === null || _c === void 0 ? void 0 : _c.config) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            return new MobileAgentConfiguration_1.MobileAgentConfiguration(rawConfig.ios.config);
        }
        return new MobileAgentConfiguration_1.MobileAgentConfiguration(undefined);
    };
    ConfigurationReader.prototype.parseJavaScriptConfiguration = function (rawConfig) {
        var _a;
        if (((_a = rawConfig === null || rawConfig === void 0 ? void 0 : rawConfig.js) === null || _a === void 0 ? void 0 : _a.url) != null) {
            var javascriptConfigurationBuilder = new JavaScriptAgentConfigurationBuilder_1.JavaScriptAgentConfigurationBuilder(rawConfig.js.url);
            javascriptConfigurationBuilder.setAgentMode(rawConfig.js.mode);
            javascriptConfigurationBuilder.setAnyCertificateAllowed(Boolean(rawConfig.js.allowanycert));
            if (rawConfig.js.htmlFiles !== undefined) {
                javascriptConfigurationBuilder.setHtmlFiles(rawConfig.js.htmlFiles);
            }
            return javascriptConfigurationBuilder.build();
        }
        return undefined;
    };
    return ConfigurationReader;
}());
exports.ConfigurationReader = ConfigurationReader;
