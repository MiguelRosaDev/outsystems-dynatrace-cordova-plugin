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
exports.DoctorAnalyzer = void 0;
var fs_1 = require("fs");
var Logger_1 = require("../logger/Logger");
var FileHelper_1 = require("../helpers/FileHelper");
var PathHelper_1 = require("../helpers/PathHelper");
var DoctorConstants_1 = require("./DoctorConstants");
var DoctorAnalyzer = (function () {
    function DoctorAnalyzer(doctor) {
        this.doctor = doctor;
    }
    DoctorAnalyzer.prototype.storeFullLogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        if (!(0, fs_1.existsSync)((0, PathHelper_1.getLogPath)())) {
                            (0, FileHelper_1.createDirectorySync)((0, PathHelper_1.getLogPath)());
                        }
                        _a = FileHelper_1.writeTextToFileSync;
                        _b = [(0, PathHelper_1.getDoctorLogPath)()];
                        return [4, this.toFullString()];
                    case 1:
                        _a.apply(void 0, _b.concat([_c.sent()]));
                        return [3, 3];
                    case 2:
                        e_1 = _c.sent();
                        Logger_1.Logger.getInstance().logError("Unable to store doctorDynatrace log file: ".concat(e_1));
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    DoctorAnalyzer.prototype.toFullString = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stringBuilder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.toString()];
                    case 1:
                        stringBuilder = _a.sent();
                        stringBuilder += "\n".concat(DoctorConstants_1.DEPENDENCIES_HEADING, "\n");
                        stringBuilder += "".concat(JSON.stringify(this.doctor.getAllDependencies(), null, '\t'));
                        return [2, stringBuilder];
                }
            });
        });
    };
    DoctorAnalyzer.prototype.toString = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stringBuilder, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stringBuilder = "".concat(DoctorConstants_1.DOCTOR_DYNATRACE_HEADING);
                        stringBuilder += '\n\n';
                        if (this.doctor.isCurrentPluginVersionAvailable()
                            && this.doctor.isLatestPluginVersionAvailable()) {
                            if (this.doctor.isPluginUpToDate()) {
                                stringBuilder += this.getPluginStringUpToDate(this.doctor.getCurrentPluginVersion());
                            }
                            else {
                                stringBuilder += this.getPluginStringUpdateRecommended(this.doctor.getCurrentPluginVersion(), this.doctor.getLatestPluginVersion());
                            }
                            stringBuilder += '\n\n';
                        }
                        stringBuilder += this.getImportantDependencyList();
                        stringBuilder += '\n';
                        _a = stringBuilder;
                        return [4, this.getProblemsList()];
                    case 1:
                        stringBuilder = _a + _b.sent();
                        stringBuilder += '\n';
                        stringBuilder += this.getImportantList();
                        return [2, stringBuilder];
                }
            });
        });
    };
    DoctorAnalyzer.prototype.getPluginStringUpToDate = function (currentPluginVersion) {
        var stringBuilder = "".concat(DoctorConstants_1.PLUGIN_VERSION_HEADING, "\n\n");
        stringBuilder += "".concat(DoctorConstants_1.PLUGIN_CURRENT).concat(DoctorConstants_1.GREEN_FONT).concat(currentPluginVersion).concat(DoctorConstants_1.RESET, "\n");
        stringBuilder += DoctorConstants_1.PLUGIN_UP_TO_DATE;
        return stringBuilder;
    };
    DoctorAnalyzer.prototype.getPluginStringUpdateRecommended = function (currentPluginVersion, latestPluginVersion) {
        var stringBuilder = "".concat(DoctorConstants_1.PLUGIN_VERSION_HEADING, "\n\n");
        stringBuilder += "".concat(DoctorConstants_1.PLUGIN_CURRENT).concat(DoctorConstants_1.RED_FONT).concat(currentPluginVersion).concat(DoctorConstants_1.RESET, "\n");
        stringBuilder += "".concat(DoctorConstants_1.PLUGIN_LATEST).concat(DoctorConstants_1.GREEN_FONT).concat(latestPluginVersion).concat(DoctorConstants_1.RESET, "\n");
        stringBuilder += DoctorConstants_1.PLUGIN_UPDATE_RECOMMEND;
        return stringBuilder;
    };
    DoctorAnalyzer.prototype.getImportantDependencyList = function () {
        var stringBuilder = "".concat(DoctorConstants_1.NATIVE_DEPENDENCIES_HEADING, "\n\n");
        var nativeWebRequestFrameworks = this.doctor.isNativeWebRequestFrameworkAvailable();
        if (Object.keys(nativeWebRequestFrameworks).length === 0) {
            stringBuilder += "".concat(DoctorConstants_1.NO_DEPENDENCIES, "\n");
        }
        else {
            Object.keys(nativeWebRequestFrameworks).forEach(function (key) {
                stringBuilder += "".concat(key, ": ").concat(nativeWebRequestFrameworks[key], "\n");
            });
        }
        return stringBuilder + '\n';
    };
    DoctorAnalyzer.prototype.getProblemsList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stringBuilder, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stringBuilder = '';
                        if (!this.doctor.isDynatraceConfigurationAvailable()) {
                            stringBuilder += DoctorConstants_1.MISSING_DYNATRACE_CONFIG;
                        }
                        else {
                            if (this.doctor.isAndroidAvailable() && !this.doctor.isAndroidUsingHybrid()) {
                                stringBuilder += DoctorConstants_1.MISSING_ANDROID_HYBRID_BLOCK;
                            }
                            if (this.doctor.isIosAvailable() && !this.doctor.isIosUsingHybrid()) {
                                stringBuilder += DoctorConstants_1.MISSING_IOS_HYBRID_PROP;
                            }
                            if (this.doctor.isIosAvailable() && !this.doctor.isIosUsingDomains()) {
                                stringBuilder += DoctorConstants_1.MISSING_IOS_DOMAIN_PROP;
                            }
                        }
                        if (this.doctor.isAndroidAvailable() && !this.doctor.isGradleAvailable()) {
                            stringBuilder += DoctorConstants_1.MISSING_GRADLE;
                        }
                        _a = this.doctor.isIosAvailable();
                        if (!_a) return [3, 2];
                        return [4, this.doctor.isIosPlistAvailable()];
                    case 1:
                        _a = !(_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            stringBuilder += DoctorConstants_1.MISSING_PLIST;
                        }
                        if (this.doctor.isMobileFirstAvailable() && !this.doctor.isMobileFirstProperVersion()) {
                            stringBuilder += DoctorConstants_1.MFP_VERSION_NOT_SUPPORTED;
                        }
                        if (this.doctor.isAndroidAvailable()) {
                            if ((0, FileHelper_1.getGradleVersionFileAsString)() === undefined) {
                                stringBuilder += DoctorConstants_1.GRADLE_VERSION_NOT_FOUND;
                            }
                            else if (!this.doctor.isGradleProperVersion()) {
                                stringBuilder += DoctorConstants_1.GRADLE_VERSION_NOT_SUPPORTED;
                            }
                        }
                        if (stringBuilder.length === 0) {
                            stringBuilder += DoctorConstants_1.NO_PROBLEMS;
                        }
                        return [2, "".concat(DoctorConstants_1.PROBLEMS_REC_HEADING, "\n") + stringBuilder];
                }
            });
        });
    };
    DoctorAnalyzer.prototype.getImportantList = function () {
        var stringBuilder = '';
        if (this.doctor.isMobileFirstAvailable()) {
            stringBuilder += DoctorConstants_1.MFP_REQ;
        }
        if (Object.keys(this.doctor.isNativeWebRequestFrameworkAvailable()).length > 0) {
            stringBuilder += DoctorConstants_1.NATIVE_REQ;
        }
        if (this.doctor.isIosAvailable() && (this.doctor.isCapacitorAvailable() || this.doctor.isIonicAvailable())) {
            stringBuilder += DoctorConstants_1.JSAGENT_REQ;
        }
        if (stringBuilder.length !== 0) {
            stringBuilder = DoctorConstants_1.IMPORTANT_HEADING + stringBuilder;
        }
        return stringBuilder;
    };
    return DoctorAnalyzer;
}());
exports.DoctorAnalyzer = DoctorAnalyzer;
