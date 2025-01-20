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
exports.Doctor = void 0;
var Platform_1 = require("../model/Platform");
var Framework_1 = require("../model/Framework");
var FileHelper_1 = require("../helpers/FileHelper");
var DoctorConstants_1 = require("./DoctorConstants");
var Doctor = (function () {
    function Doctor(platforms, framework, latestPluginVersion, packageJson, dynatraceConfiguration) {
        this.platforms = platforms;
        this.latestPluginVersion = latestPluginVersion;
        this.packageJson = packageJson;
        this.dynatraceConfiguration = dynatraceConfiguration;
        this.framework = framework;
    }
    Doctor.prototype.isCurrentPluginVersionAvailable = function () {
        return this.getCurrentPluginVersion() !== undefined;
    };
    Doctor.prototype.isLatestPluginVersionAvailable = function () {
        return this.getLatestPluginVersion() !== undefined;
    };
    Doctor.prototype.isPluginUpToDate = function () {
        if (this.isLatestPluginVersionAvailable() && this.isCurrentPluginVersionAvailable()) {
            var currentArray = this.getCurrentPluginVersion().split('.');
            var latestArray = this.getLatestPluginVersion().split('.');
            if (latestArray[0] === currentArray[0]) {
                if (latestArray[1] === currentArray[1]) {
                    if (latestArray[2] === currentArray[2]) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Doctor.prototype.getCurrentPluginVersion = function () {
        if (this.packageJson) {
            return this.packageJson.getPackageVersion();
        }
        return undefined;
    };
    Doctor.prototype.getLatestPluginVersion = function () {
        return this.latestPluginVersion;
    };
    Doctor.prototype.isIosAvailable = function () {
        return this.platforms.includes(Platform_1.Platform.IOS);
    };
    Doctor.prototype.isAndroidAvailable = function () {
        return this.platforms.includes(Platform_1.Platform.Android);
    };
    Doctor.prototype.isCordovaAvailable = function () {
        return this.framework === Framework_1.Framework.Cordova;
    };
    Doctor.prototype.isIonicAvailable = function () {
        return this.framework === Framework_1.Framework.Ionic;
    };
    Doctor.prototype.isCapacitorAvailable = function () {
        return this.framework === Framework_1.Framework.Capacitor;
    };
    Doctor.prototype.isNativeWebRequestFrameworkAvailable = function () {
        var dependenciesToCollect = {};
        if (this.packageJson) {
            for (var _i = 0, DEPENDENCY_LIST_1 = DoctorConstants_1.DEPENDENCY_LIST; _i < DEPENDENCY_LIST_1.length; _i++) {
                var dependency = DEPENDENCY_LIST_1[_i];
                if (this.packageJson.isDependencyAvailable(dependency)) {
                    dependenciesToCollect[dependency] = this.packageJson.getDependencyVersion(dependency);
                }
            }
        }
        return dependenciesToCollect;
    };
    Doctor.prototype.isMobileFirstAvailable = function () {
        if (this.packageJson) {
            return this.packageJson.isDependencyAvailable(DoctorConstants_1.MFP_DEPENDENCY_NAME);
        }
        return false;
    };
    Doctor.prototype.isMobileFirstProperVersion = function () {
        if (this.isMobileFirstAvailable()) {
            var version = this.packageJson.getDependencyVersion(DoctorConstants_1.MFP_DEPENDENCY_NAME);
            if (version !== undefined) {
                return version.startsWith('^') ? parseFloat(version.replace('^', '')) > 7 : parseFloat(version) > 7;
            }
        }
        return false;
    };
    Doctor.prototype.getAllDependencies = function () {
        if (this.packageJson) {
            return this.packageJson.getAllDependencies();
        }
        return {};
    };
    Doctor.prototype.isDynatraceConfigurationAvailable = function () {
        return this.dynatraceConfiguration !== undefined;
    };
    Doctor.prototype.isAndroidUsingHybrid = function () {
        if (this.isAndroidAvailable() && this.isDynatraceConfigurationAvailable()) {
            if (this.dynatraceConfiguration.isAndroidConfigurationAvailable()
                && this.dynatraceConfiguration.getAndroidConfiguration().getConfiguration() !== undefined &&
                this.dynatraceConfiguration.getAndroidConfiguration().getConfiguration().includes('hybridWebView')) {
                return true;
            }
        }
        return false;
    };
    Doctor.prototype.isIosUsingHybrid = function () {
        if (this.isIosAvailable() && this.isDynatraceConfigurationAvailable()) {
            if (this.dynatraceConfiguration.isIosConfigurationAvailable()
                && this.dynatraceConfiguration.getIosConfiguration().getConfiguration() !== undefined &&
                this.dynatraceConfiguration.getIosConfiguration().getConfiguration().includes('<key>DTXHybridApplication</key>')) {
                return true;
            }
        }
        return false;
    };
    Doctor.prototype.isIosUsingDomains = function () {
        if (this.isIosAvailable() && this.isDynatraceConfigurationAvailable()) {
            if (this.dynatraceConfiguration.isIosConfigurationAvailable()
                && this.dynatraceConfiguration.getIosConfiguration().getConfiguration() !== undefined &&
                this.dynatraceConfiguration.getIosConfiguration().getConfiguration().includes('<key>DTXSetCookiesForDomain</key>')) {
                return true;
            }
        }
        return false;
    };
    Doctor.prototype.isIosPlistAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isIosAvailable()) return [3, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, (0, FileHelper_1.getPlistAsPath)(this.isCapacitorAvailable())];
                    case 2: return [2, (_a.sent()) !== undefined];
                    case 3:
                        e_1 = _a.sent();
                        return [3, 4];
                    case 4: return [2, false];
                }
            });
        });
    };
    Doctor.prototype.isGradleAvailable = function () {
        if (this.isAndroidAvailable()) {
            try {
                return (0, FileHelper_1.isGradleAvailable)(this.isCapacitorAvailable());
            }
            catch (e) {
            }
        }
        return false;
    };
    Doctor.prototype.isGradleProperVersion = function () {
        try {
            if (this.isAndroidAvailable() && (0, FileHelper_1.isGradleAvailable)()) {
                if (this.isCapacitorAvailable()) {
                    return true;
                }
                var gradleVersionFileStr = (0, FileHelper_1.getGradleVersionFileAsString)();
                if (gradleVersionFileStr !== undefined) {
                    return parseInt(gradleVersionFileStr.substring(gradleVersionFileStr.indexOf('distributions/gradle-') + 21, gradleVersionFileStr.indexOf('-all.zip')), 10) >= DoctorConstants_1.GRADLE_MIN_VERSION;
                }
            }
        }
        catch (error) {
        }
        return false;
    };
    return Doctor;
}());
exports.Doctor = Doctor;
