"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CordovaPluginConfigurationBuilder = void 0;
var CordovaPluginConfiguration_1 = require("./CordovaPluginConfiguration");
var CordovaPluginConfigurationConstants_1 = require("./CordovaPluginConfigurationConstants");
var CordovaPluginConfigurationBuilder = (function () {
    function CordovaPluginConfigurationBuilder() {
        this.debug = CordovaPluginConfigurationConstants_1.DEFAULT_DEBUG_MODE;
        this.cookieProxy = CordovaPluginConfigurationConstants_1.DEFAULT_COOKIE_PROXY;
        this.capacitorCookieProxy = CordovaPluginConfigurationConstants_1.DEFAULT_CAPACITOR_COOKIE_PROXY;
    }
    CordovaPluginConfigurationBuilder.prototype.setDebugMode = function (debug) {
        this.debug = debug;
        return this;
    };
    CordovaPluginConfigurationBuilder.prototype.setCSPUrl = function (cspUrl) {
        this.cspUrl = cspUrl;
        return this;
    };
    CordovaPluginConfigurationBuilder.prototype.setCookieProxy = function (cookieProxy) {
        this.cookieProxy = cookieProxy;
        return this;
    };
    CordovaPluginConfigurationBuilder.prototype.setCapacitorCookieProxy = function (capacitorCookieProxy) {
        this.capacitorCookieProxy = capacitorCookieProxy;
        return this;
    };
    CordovaPluginConfigurationBuilder.prototype.setJsAgentPath = function (jsAgentPath) {
        this.jsAgentPath = jsAgentPath;
        return this;
    };
    CordovaPluginConfigurationBuilder.prototype.setGradlePath = function (gradlePath) {
        this.gradlePath = gradlePath;
        return this;
    };
    CordovaPluginConfigurationBuilder.prototype.setPlistPath = function (plistPath) {
        this.plistPath = plistPath;
        return this;
    };
    CordovaPluginConfigurationBuilder.prototype.build = function () {
        return new CordovaPluginConfiguration_1.CordovaPluginConfiguration(this.debug, this.cookieProxy, this.capacitorCookieProxy, this.cspUrl, this.jsAgentPath, this.gradlePath, this.plistPath);
    };
    return CordovaPluginConfigurationBuilder;
}());
exports.CordovaPluginConfigurationBuilder = CordovaPluginConfigurationBuilder;
