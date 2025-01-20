"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var jsAgentCookies = ['dtCookie', 'dtLatC', 'dtPC', 'dtSa', 'dtValidationCookie', 'rxVisitor', 'rxvt'];
var mobileAgentCookies = ['dtAdk', 'dtAdkSettings'];
var cookieList = __spreadArray(__spreadArray([], jsAgentCookies, true), mobileAgentCookies, true);
var sessionStoragePrefix = '_dt.';
try {
    if (typeof Document !== 'undefined') {
        var cookieDesc_1 = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
            Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');
        if ((cookieDesc_1 === null || cookieDesc_1 === void 0 ? void 0 : cookieDesc_1.configurable) === true) {
            Object.defineProperty(document, 'cookie', {
                get: function () {
                    if (typeof window.Capacitor !== 'undefined') {
                        if (window.Capacitor.platform === 'ios') {
                            var payload = {
                                type: 'CapacitorCookies.get',
                            };
                            var res = prompt(JSON.stringify(payload));
                            return patchCookies(res);
                        }
                    }
                    return patchCookies(cookieDesc_1.get.call(document));
                },
                set: function (val) {
                    if (typeof window.Capacitor !== 'undefined') {
                        var cookiePairs = val.split(';');
                        var domainSection = val.toLowerCase().split('domain=')[1];
                        var domain = cookiePairs.length > 1 &&
                            domainSection != null &&
                            domainSection.length > 0
                            ? domainSection.split(';')[0].trim()
                            : '';
                        if (window.Capacitor.platform === 'ios') {
                            var payload = {
                                type: 'CapacitorCookies.set',
                                action: val,
                                domain: domain,
                            };
                            prompt(JSON.stringify(payload));
                        }
                        else if (typeof window.CapacitorCookiesAndroidInterface !== 'undefined') {
                            window.CapacitorCookiesAndroidInterface.setCookie(domain, val);
                        }
                    }
                    setCookie(val);
                },
            });
        }
    }
}
catch (e) {
    console.warn('[DYNATRACE]: Unable to setup the capacitor cookie proxy!\n' + e);
}
var setCookie = function (value) {
    if (value !== undefined) {
        var cookieParts = value.split(';');
        var values = cookieParts[0].split(/=(.+)/);
        if (values.length > 1 && isCookieImportant(values[0])) {
            if (values[0] !== undefined && values[1] !== undefined && sessionStorage !== undefined) {
                sessionStorage.setItem(sessionStoragePrefix + values[0], values[1]);
            }
        }
    }
};
var patchCookies = function (allCookies) {
    if (allCookies === undefined || allCookies.length === 0) {
        return getAllCookies();
    }
    return allCookies;
};
var getAllCookies = function () {
    var cookieString = '';
    var correctCookieList = [];
    if (isCookiePostfixEnabled()) {
        correctCookieList = generateCookieListWithPostfix();
    }
    else {
        correctCookieList = cookieList;
    }
    for (var _i = 0, correctCookieList_1 = correctCookieList; _i < correctCookieList_1.length; _i++) {
        var cookieName = correctCookieList_1[_i];
        var cookie = getCookie(cookieName);
        if (cookie !== undefined && cookie !== null) {
            if (cookieString.length === 0) {
                cookieString += "".concat(cookieName, "=").concat(cookie);
            }
            else {
                cookieString += "; ".concat(cookieName, "=").concat(cookie);
            }
        }
    }
    return cookieString;
};
var getCookie = function (name) {
    if (name !== undefined && sessionStorage !== undefined) {
        return sessionStorage.getItem(sessionStoragePrefix + name);
    }
};
var isCookieImportant = function (name) {
    if (name !== undefined && name.length > 0) {
        if (isCookiePostfixEnabled()) {
            return generateCookieListWithPostfix().includes(name);
        }
        return cookieList.includes(name);
    }
    return false;
};
var isCookiePostfixEnabled = function () {
    return typeof dT_ !== 'undefined' && dT_.initialized === true && typeof dT_.cfg !== 'undefined'
        && typeof dT_.cfg('postfix') !== 'undefined';
};
var generateCookieListWithPostfix = function () {
    return __spreadArray(__spreadArray([], jsAgentCookies.map(function (value) { return value + dT_.cfg('postfix'); }), true), mobileAgentCookies, true);
};
if (typeof exports !== 'undefined') {
    exports.setCookie = setCookie;
    exports.patchCookies = patchCookies;
    exports.sessionStoragePrefix = sessionStoragePrefix;
    exports.isCookiePostfixEnabled = isCookiePostfixEnabled;
    exports.generateCookieListWithPostfix = generateCookieListWithPostfix;
    exports.isCookieImportant = isCookieImportant;
}
