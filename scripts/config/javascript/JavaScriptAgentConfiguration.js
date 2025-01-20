"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JavaScriptAgentConfiguration = void 0;
var JavaScriptAgentMode_1 = require("./JavaScriptAgentMode");
var JavaScriptAgentConfiguration = (function () {
    function JavaScriptAgentConfiguration(agentUrl, agentMode, allowAnyCertificate, htmlFiles) {
        this.agentUrl = agentUrl.replace(JavaScriptAgentMode_1.JAVA_SCRIPT_AGENT_MODE_NAMES[0], JavaScriptAgentMode_1.JAVA_SCRIPT_AGENT_MODE_NAMES[agentMode]);
        this.agentMode = agentMode;
        this.allowAnyCertificate = allowAnyCertificate;
        this.htmlFiles = htmlFiles;
    }
    JavaScriptAgentConfiguration.prototype.getAgentUrl = function () {
        return this.agentUrl;
    };
    JavaScriptAgentConfiguration.prototype.getMode = function () {
        return this.agentMode;
    };
    JavaScriptAgentConfiguration.prototype.isAnyCertificateAllowed = function () {
        return this.allowAnyCertificate;
    };
    JavaScriptAgentConfiguration.prototype.isAgentUrlValid = function () {
        if (this.agentUrl === undefined || this.agentUrl.length === 0) {
            return false;
        }
        for (var _i = 0, JAVA_SCRIPT_AGENT_MODE_NAMES_1 = JavaScriptAgentMode_1.JAVA_SCRIPT_AGENT_MODE_NAMES; _i < JAVA_SCRIPT_AGENT_MODE_NAMES_1.length; _i++) {
            var mode = JAVA_SCRIPT_AGENT_MODE_NAMES_1[_i];
            if (this.agentUrl.indexOf(mode) >= 0) {
                return true;
            }
        }
        return false;
    };
    JavaScriptAgentConfiguration.prototype.getHtmlFiles = function () {
        return this.htmlFiles;
    };
    return JavaScriptAgentConfiguration;
}());
exports.JavaScriptAgentConfiguration = JavaScriptAgentConfiguration;
