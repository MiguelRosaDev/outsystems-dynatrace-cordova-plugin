"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CordovaPluginConfiguration = void 0;
var CordovaPluginConfiguration = (function () {
    function CordovaPluginConfiguration(debugEnabled, cookieProxy, capacitorCookieProxy, cspUrl, jsAgentPath, gradlePath, plistPath) {
        this.debugEnabled = debugEnabled;
        this.cookieProxy = cookieProxy;
        this.capacitorCookieProxy = capacitorCookieProxy;
        this.cspUrl = cspUrl;
        this.jsAgentPath = jsAgentPath;
        this.gradlePath = gradlePath;
        this.plistPath = plistPath;
    }
    CordovaPluginConfiguration.prototype.isDebugEnabled = function () {
        return this.debugEnabled;
    };
    CordovaPluginConfiguration.prototype.isCSPUrlAvailable = function () {
        return this.cspUrl !== undefined;
    };
    CordovaPluginConfiguration.prototype.getCSPUrl = function () {
        return this.cspUrl;
    };
    CordovaPluginConfiguration.prototype.isCookieProxyEnabled = function () {
        return this.cookieProxy;
    };
    CordovaPluginConfiguration.prototype.isCapacitorCookieProxyEnabled = function () {
        return this.capacitorCookieProxy;
    };
    CordovaPluginConfiguration.prototype.isJsAgentPathAvailable = function () {
        return this.jsAgentPath !== undefined;
    };
    CordovaPluginConfiguration.prototype.getJsAgentPath = function () {
        return this.jsAgentPath;
    };
    CordovaPluginConfiguration.prototype.isGradlePathAvailable = function () {
        return this.gradlePath !== undefined;
    };
    CordovaPluginConfiguration.prototype.getGradlePath = function () {
        return this.gradlePath;
    };
    CordovaPluginConfiguration.prototype.isPlistPathAvailable = function () {
        return this.plistPath !== undefined;
    };
    CordovaPluginConfiguration.prototype.getPlistPath = function () {
        return this.plistPath;
    };
    return CordovaPluginConfiguration;
}());
exports.CordovaPluginConfiguration = CordovaPluginConfiguration;
