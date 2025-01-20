"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumberToMode = exports.JAVA_SCRIPT_AGENT_MODE_NAMES = exports.DEFAULT_JAVASCRIPT_AGENT_MODE = exports.JavaScriptAgentMode = void 0;
var JavaScriptAgentMode;
(function (JavaScriptAgentMode) {
    JavaScriptAgentMode[JavaScriptAgentMode["JsInlineScript"] = 0] = "JsInlineScript";
    JavaScriptAgentMode[JavaScriptAgentMode["JsTagComplete"] = 1] = "JsTagComplete";
    JavaScriptAgentMode[JavaScriptAgentMode["SyncCs"] = 2] = "SyncCs";
    JavaScriptAgentMode[JavaScriptAgentMode["AsyncCs"] = 3] = "AsyncCs";
    JavaScriptAgentMode[JavaScriptAgentMode["JsTag"] = 4] = "JsTag";
})(JavaScriptAgentMode = exports.JavaScriptAgentMode || (exports.JavaScriptAgentMode = {}));
exports.DEFAULT_JAVASCRIPT_AGENT_MODE = JavaScriptAgentMode.JsTagComplete;
exports.JAVA_SCRIPT_AGENT_MODE_NAMES = ['jsInlineScript', 'jsTagComplete', 'syncCS', 'asyncCS', 'jsTag'];
var parseNumberToMode = function (mode) {
    switch (mode) {
        case 0:
            return JavaScriptAgentMode.JsInlineScript;
        case 1:
            return JavaScriptAgentMode.JsTagComplete;
        case 2:
            return JavaScriptAgentMode.SyncCs;
        case 3:
            return JavaScriptAgentMode.AsyncCs;
        case 4:
            return JavaScriptAgentMode.JsTag;
        default:
            return exports.DEFAULT_JAVASCRIPT_AGENT_MODE;
    }
};
exports.parseNumberToMode = parseNumberToMode;
