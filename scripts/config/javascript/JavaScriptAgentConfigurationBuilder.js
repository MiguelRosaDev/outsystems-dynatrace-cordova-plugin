"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaScriptAgentConfigurationBuilder = void 0;
var JavaScriptAgentConfiguration_1 = require("./JavaScriptAgentConfiguration");
var JavaScriptAgentConfigurationConstants_1 = require("./JavaScriptAgentConfigurationConstants");
var JavaScriptAgentMode_1 = require("./JavaScriptAgentMode");
var JavaScriptAgentConfigurationBuilder = (function () {
    function JavaScriptAgentConfigurationBuilder(agentUrl) {
        this.agentMode = JavaScriptAgentMode_1.DEFAULT_JAVASCRIPT_AGENT_MODE;
        this.anyCertificateAllowed = JavaScriptAgentConfigurationConstants_1.DEFAULT_IS_ANY_CERTIFICATE_ALLOWED;
        this.htmlFiles = [];
        this.agentUrl = this.patchIncorrectJSUrl(agentUrl);
    }
    JavaScriptAgentConfigurationBuilder.prototype.setAgentMode = function (agentMode) {
        if (agentMode !== undefined && !Number.isNaN(agentMode)) {
            this.agentMode = (0, JavaScriptAgentMode_1.parseNumberToMode)(agentMode);
        }
        return this;
    };
    JavaScriptAgentConfigurationBuilder.prototype.setAnyCertificateAllowed = function (anyCertificateAllowed) {
        this.anyCertificateAllowed = anyCertificateAllowed;
        return this;
    };
    JavaScriptAgentConfigurationBuilder.prototype.setHtmlFiles = function (htmlFiles) {
        this.htmlFiles = htmlFiles;
        return this;
    };
    JavaScriptAgentConfigurationBuilder.prototype.build = function () {
        return new JavaScriptAgentConfiguration_1.JavaScriptAgentConfiguration(this.agentUrl, this.agentMode, this.anyCertificateAllowed, this.htmlFiles);
    };
    JavaScriptAgentConfigurationBuilder.prototype.patchIncorrectJSUrl = function (url) {
        return url.replace('ApiToken=', 'Api-Token=');
    };
    return JavaScriptAgentConfigurationBuilder;
}());
exports.JavaScriptAgentConfigurationBuilder = JavaScriptAgentConfigurationBuilder;
