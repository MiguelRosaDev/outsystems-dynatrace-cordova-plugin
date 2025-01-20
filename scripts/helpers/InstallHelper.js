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
exports.isOptOut = exports.parsedNpmConfig = exports.parsedCapPackageJson = exports.parsedPluginPackageJson = exports.parsedApplicationPackageJson = exports.removeScriptHookAndDeps = exports.addScriptHook = exports.isCapVersionThreeOneOrHigher = exports.removePListModification = exports.removeGradleModification = exports.modifyPackageJsonCap = exports.CAP_HOOK = exports.IONIC_HOOK = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var Android_1 = require("../Android");
var Ios_1 = require("../Ios");
var Logger_1 = require("../logger/Logger");
var FileHelper_1 = require("./FileHelper");
var PathHelper_1 = require("./PathHelper");
var child_process_1 = require("child_process");
exports.IONIC_HOOK = 'ionic:capacitor:build:before';
exports.CAP_HOOK = 'capacitor:sync:after';
var DYNATRACE_PLUGIN = '@dynatrace/cordova-plugin';
var NPM_CONFIG_OPT_OUT = 'dynatrace-not-adding-scripts';
var modifyPackageJsonCap = function (install, isOptOut, path) { return __awaiter(void 0, void 0, void 0, function () {
    var packageJsonParsed, _a, capPackageJsonParsed, capHookValue, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                if (!(isOptOut !== true)) return [3, 6];
                if (!(path !== undefined && path)) return [3, 2];
                return [4, parsedPackageJson(path)];
            case 1:
                _a = _b.sent();
                return [3, 4];
            case 2: return [4, (0, exports.parsedApplicationPackageJson)()];
            case 3:
                _a = _b.sent();
                _b.label = 4;
            case 4:
                packageJsonParsed = _a;
                return [4, (0, exports.parsedCapPackageJson)()];
            case 5:
                capPackageJsonParsed = _b.sent();
                if (install) {
                    capHookValue = 'node ' + (0, path_1.relative)((0, path_1.join)(((0, PathHelper_1.getApplicationPath)())), (0, path_1.join)(__dirname, '..', 'InstrumentCap.js'));
                    if (packageJsonParsed.scripts === undefined) {
                        packageJsonParsed.scripts = {};
                    }
                    if ((0, exports.isCapVersionThreeOneOrHigher)(capPackageJsonParsed)) {
                        packageJsonParsed = (0, exports.addScriptHook)(packageJsonParsed, exports.CAP_HOOK, capHookValue);
                        if (packageJsonParsed.scripts[exports.IONIC_HOOK] && packageJsonParsed.scripts[exports.CAP_HOOK]) {
                            delete packageJsonParsed.scripts[exports.IONIC_HOOK];
                        }
                    }
                    else {
                        packageJsonParsed = (0, exports.addScriptHook)(packageJsonParsed, exports.IONIC_HOOK, capHookValue);
                    }
                }
                else {
                    packageJsonParsed = (0, exports.removeScriptHookAndDeps)(packageJsonParsed);
                }
                if (path !== undefined && path) {
                    (0, FileHelper_1.writeTextToFileSync)(path, JSON.stringify(packageJsonParsed, null, '\t'));
                }
                else {
                    (0, FileHelper_1.writeTextToFileSync)((0, PathHelper_1.getApplicationPackage)(), JSON.stringify(packageJsonParsed, null, '\t'));
                }
                _b.label = 6;
            case 6: return [3, 8];
            case 7:
                e_1 = _b.sent();
                Logger_1.Logger.getInstance().logWarning('Error in modifyPackageJsonCap => \n' + e_1);
                return [3, 8];
            case 8: return [2];
        }
    });
}); };
exports.modifyPackageJsonCap = modifyPackageJsonCap;
var removeGradleModification = function () { return __awaiter(void 0, void 0, void 0, function () {
    var path;
    return __generator(this, function (_a) {
        try {
            path = void 0;
            if ((0, PathHelper_1.isCapacitorApp)()) {
                path = (0, PathHelper_1.getAndroidGradleFile)((0, PathHelper_1.getAndroidPathCapacitor)());
            }
            else {
                path = (0, PathHelper_1.getAndroidGradleFile)((0, PathHelper_1.getAndroidPath)());
            }
            if ((0, fs_1.existsSync)(path)) {
                try {
                    (0, Android_1.instrumentAndroidPlatform)(path, true);
                }
                catch (e) {
                    Logger_1.Logger.getInstance().logError("Removal of Gradle modification didn't work!");
                }
            }
        }
        catch (e) {
        }
        return [2];
    });
}); };
exports.removeGradleModification = removeGradleModification;
var removePListModification = function () { return __awaiter(void 0, void 0, void 0, function () {
    var isCapacitor, e_2, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                isCapacitor = (0, PathHelper_1.isCapacitorApp)();
                if (!(0, fs_1.existsSync)(isCapacitor ? (0, PathHelper_1.getIosPlistPathCapacitor)() : (0, PathHelper_1.getIosPath)())) {
                    return [2];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                if (!isCapacitor) return [3, 3];
                return [4, (0, Ios_1.modifyPListFile)((0, PathHelper_1.getIosPlistPathCapacitor)(), undefined, true)];
            case 2:
                _a.sent();
                return [3, 5];
            case 3: return [4, (0, Ios_1.modifyPListFile)(undefined, undefined, true)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3, 7];
            case 6:
                e_2 = _a.sent();
                Logger_1.Logger.getInstance().logError("Removal of PList modification didn't work!");
                return [3, 7];
            case 7: return [3, 9];
            case 8:
                e_3 = _a.sent();
                return [3, 9];
            case 9: return [2];
        }
    });
}); };
exports.removePListModification = removePListModification;
var isCapVersionThreeOneOrHigher = function (packageJson) {
    var version = packageJson.version;
    return Number(version.substring(0, version.lastIndexOf('.'))) >= 3.1;
};
exports.isCapVersionThreeOneOrHigher = isCapVersionThreeOneOrHigher;
var addScriptHook = function (packageJsonParsed, hook, value) {
    if (packageJsonParsed.scripts[hook] !== value) {
        packageJsonParsed.scripts[hook] = value;
    }
    return packageJsonParsed;
};
exports.addScriptHook = addScriptHook;
var removeScriptHookAndDeps = function (packageJsonParsed) {
    if (packageJsonParsed.dependencies !== undefined) {
        delete packageJsonParsed.dependencies[DYNATRACE_PLUGIN];
    }
    if (packageJsonParsed.devDependencies !== undefined) {
        delete packageJsonParsed.devDependencies[DYNATRACE_PLUGIN];
    }
    if (packageJsonParsed.scripts !== undefined) {
        if ((0, PathHelper_1.isCapacitorApp)()) {
            delete packageJsonParsed.scripts[exports.IONIC_HOOK];
            delete packageJsonParsed.scripts[exports.CAP_HOOK];
        }
    }
    return packageJsonParsed;
};
exports.removeScriptHookAndDeps = removeScriptHookAndDeps;
var parsedPackageJson = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, e_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _b = (_a = JSON).parse;
                return [4, (0, FileHelper_1.readTextFromFile)(path)];
            case 1: return [2, _b.apply(_a, [_c.sent()])];
            case 2:
                e_4 = _c.sent();
                Logger_1.Logger.getInstance().logWarning('Error in parsedPackageJson => \n' + e_4 + '\nUnable to find package.json!');
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
var parsedApplicationPackageJson = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2, parsedPackageJson((0, PathHelper_1.getApplicationPackage)())];
}); }); };
exports.parsedApplicationPackageJson = parsedApplicationPackageJson;
var parsedPluginPackageJson = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2, parsedPackageJson((0, PathHelper_1.getPluginPackage)())];
}); }); };
exports.parsedPluginPackageJson = parsedPluginPackageJson;
var parsedCapPackageJson = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2, parsedPackageJson((0, PathHelper_1.getCapCliPackage)())];
}); }); };
exports.parsedCapPackageJson = parsedCapPackageJson;
var parsedNpmConfig = function () {
    try {
        return JSON.parse((0, child_process_1.execSync)('npm config list --json').toString());
    }
    catch (e) {
        Logger_1.Logger.getInstance().logWarning('Error in parsedNpmConfig => \n' + e + '\nUnable to retrieve npm config list!');
    }
};
exports.parsedNpmConfig = parsedNpmConfig;
var isOptOut = function (parsedNpmConfig) {
    return parsedNpmConfig !== undefined && parsedNpmConfig[NPM_CONFIG_OPT_OUT] !== undefined ? parsedNpmConfig[NPM_CONFIG_OPT_OUT] : false;
};
exports.isOptOut = isOptOut;
