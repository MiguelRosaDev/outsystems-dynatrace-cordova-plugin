"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLVerifier = void 0;
var path_1 = require("path");
var HtmlConstants_1 = require("./HtmlConstants");
var HTMLVerifier = (function () {
    function HTMLVerifier(htmlFile) {
        this.htmlFile = htmlFile;
    }
    HTMLVerifier.prototype.isQualified = function () {
        return this.isHTMLCordova() || this.isHTMLIonic() || (this.hasDoctypeHtml() && this.hasHtmlAndHeadTags());
    };
    HTMLVerifier.prototype.hasHtmlAndHeadTags = function () {
        for (var _i = 0, HTML_REQUIRED_1 = HtmlConstants_1.HTML_REQUIRED; _i < HTML_REQUIRED_1.length; _i++) {
            var htmlRequired = HTML_REQUIRED_1[_i];
            var htmlStr = this.htmlFile.getHtmlString();
            if (htmlStr.indexOf(htmlRequired) < 0) {
                return false;
            }
        }
        return true;
    };
    HTMLVerifier.prototype.hasDoctypeHtml = function () {
        return this.htmlFile.getDOM().window.document.doctype ? this.htmlFile.getDOM().window.document.doctype.name.includes("html") : false;
    };
    HTMLVerifier.prototype.isHTMLCordova = function () {
        var scripts = this.htmlFile.getDOM().window.document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var item = scripts.item(i);
            if (item !== null && (0, path_1.basename)(item.src) === 'cordova.js') {
                return true;
            }
        }
        return false;
    };
    HTMLVerifier.prototype.isHTMLIonic = function () {
        for (var _i = 0, HTML_IDENTIFIER_1 = HtmlConstants_1.HTML_IDENTIFIER; _i < HTML_IDENTIFIER_1.length; _i++) {
            var htmlIdentifier = HTML_IDENTIFIER_1[_i];
            var tags = this.htmlFile.getDOM().window.document.getElementsByTagName(htmlIdentifier);
            if (tags.length > 0) {
                return true;
            }
        }
        return false;
    };
    return HTMLVerifier;
}());
exports.HTMLVerifier = HTMLVerifier;
