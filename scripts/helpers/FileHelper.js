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
exports.getGradleVersionFileAsString = exports.getDynatraceConfigAsObject = exports.getPlistAsPath = exports.isGradleAvailable = exports.isPlatformAvailable = exports.copyFileSync = exports.copyFile = exports.renameFileSync = exports.renameFile = exports.deleteFileSync = exports.deleteFile = exports.deleteDirectory = exports.createDirectorySync = exports.createDirectory = exports.writeTextToFileSync = exports.writeTextToFile = exports.readTextFromFile = exports.readTextFromFileSync = exports.appendFileSync = exports.searchFileExtInDirectoryNonRecursive = exports.searchFileExtInDirectoryRecursive = exports.searchFilesInDirectoryRecursive = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var Logger_1 = require("../logger/Logger");
var Ios_1 = require("../Ios");
var PathHelper_1 = require("./PathHelper");
var searchFilesInDirectoryRecursive = function (searchPath, fileExt, filteredDirectories) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2, _searchFilePatternInDirectory(searchPath, [], fileExt, filteredDirectories, true, compareFileNames)];
}); }); };
exports.searchFilesInDirectoryRecursive = searchFilesInDirectoryRecursive;
var searchFileExtInDirectoryRecursive = function (searchPath, fileExt, filteredDirectories) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2, _searchFilePatternInDirectory(searchPath, [], fileExt, filteredDirectories, true, compareExt)];
}); }); };
exports.searchFileExtInDirectoryRecursive = searchFileExtInDirectoryRecursive;
var searchFileExtInDirectoryNonRecursive = function (searchPath, fileExt, filteredDirectories) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2, _searchFilePatternInDirectory(searchPath, [], fileExt, filteredDirectories, false, compareExt)];
}); }); };
exports.searchFileExtInDirectoryNonRecursive = searchFileExtInDirectoryNonRecursive;
var compareFileNames = function (file, filePattern) {
    var fileName = (0, path_1.basename)(file);
    return fileName.indexOf(filePattern) > -1;
};
var compareExt = function (file, ext) {
    var extName = (0, path_1.extname)(file);
    return extName === ext;
};
var _searchFilePatternInDirectory = function (searchPath, foundFiles, pattern, filteredDirectories, recursive, fileCompare) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, new Promise(function (resolve, reject) {
                (0, fs_1.readdir)(searchPath, function (err, files) {
                    if (err) {
                        reject('Directory could not be read: ' + (0, path_1.resolve)(searchPath));
                        return;
                    }
                    var promiseArr = [];
                    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                        var fileName = files_1[_i];
                        var dirInfo = isDirectory((0, path_1.join)(searchPath, fileName));
                        if (dirInfo) {
                            promiseArr.push(dirInfo);
                        }
                    }
                    Promise.all(promiseArr).then(function (values) {
                        var dirArr = [];
                        for (var i = 0; i < promiseArr.length; i++) {
                            if (values[i].isDirectory) {
                                if (!isDirectoryFiltered(values[i].path, filteredDirectories) && recursive) {
                                    dirArr.push(values[i].path);
                                }
                            }
                            else {
                                if (fileCompare(values[i].path, pattern)) {
                                    foundFiles.push(values[i].path);
                                }
                            }
                        }
                        var anotherPromise = Promise.resolve(foundFiles);
                        var _loop_1 = function (directory) {
                            anotherPromise = anotherPromise.then(function (foundFiles) { return _searchFilePatternInDirectory(directory, foundFiles, pattern, filteredDirectories, recursive, fileCompare); });
                        };
                        for (var _i = 0, dirArr_1 = dirArr; _i < dirArr_1.length; _i++) {
                            var directory = dirArr_1[_i];
                            _loop_1(directory);
                        }
                        if (dirArr.length === 0) {
                            resolve(foundFiles);
                        }
                        else {
                            resolve(anotherPromise);
                        }
                    });
                });
            })];
    });
}); };
var isDirectory = function (checkPath) {
    try {
        var stats = (0, fs_1.statSync)(checkPath);
        return {
            isDirectory: stats.isDirectory(),
            path: checkPath,
        };
    }
    catch (e) {
        Logger_1.Logger.getInstance().logWarning("Directory or File could not be read: ".concat((0, path_1.resolve)(checkPath)));
        return undefined;
    }
};
var isDirectoryFiltered = function (dirPath, filteredDirectories) {
    var dirName = (0, path_1.basename)(dirPath);
    for (var _i = 0, filteredDirectories_1 = filteredDirectories; _i < filteredDirectories_1.length; _i++) {
        var directory = filteredDirectories_1[_i];
        if (dirName === directory) {
            return true;
        }
    }
    return false;
};
var appendFileSync = function (file, text) {
    (0, fs_1.appendFileSync)(file, text);
};
exports.appendFileSync = appendFileSync;
var readTextFromFileSync = function (_file) { return (0, fs_1.readFileSync)(_file, 'utf8'); };
exports.readTextFromFileSync = readTextFromFileSync;
var readTextFromFile = function (_file) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, new Promise(function (resolve, reject) {
                (0, fs_1.readFile)(_file, 'utf8', function (err, data) {
                    if (err) {
                        reject(err + 'Could not read the file: ' + (0, path_1.resolve)(_file));
                    }
                    resolve(data);
                });
            })];
    });
}); };
exports.readTextFromFile = readTextFromFile;
var writeTextToFile = function (_file, _text) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, new Promise(function (resolve, reject) {
                (0, fs_1.writeFile)(_file, _text, function (err) {
                    if (err) {
                        reject(err + ' Could not write to file: ' + (0, path_1.resolve)(_file));
                    }
                    resolve(_file);
                });
            })];
    });
}); };
exports.writeTextToFile = writeTextToFile;
var writeTextToFileSync = function (_file, _text) {
    try {
        (0, fs_1.writeFileSync)(_file, _text);
        return _file;
    }
    catch (err) {
        throw new Error(err + ' Could not write to file: ' + (0, path_1.resolve)(_file));
    }
};
exports.writeTextToFileSync = writeTextToFileSync;
var createDirectory = function (directory) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, new Promise(function (resolve, reject) {
                (0, fs_1.mkdir)(directory, function (err) {
                    if (err) {
                        resolve(false);
                    }
                    resolve(true);
                });
            })];
    });
}); };
exports.createDirectory = createDirectory;
var createDirectorySync = function (directory) {
    try {
        mkdirSyncRecursive(directory);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.createDirectorySync = createDirectorySync;
var mkdirSyncRecursive = function (directory) {
    var pathParts = directory.split(path_1.sep);
    for (var i = 1; i <= pathParts.length; i++) {
        var segment = pathParts.slice(0, i).join(path_1.sep);
        if (segment.length > 0) {
            if (!(0, fs_1.existsSync)(segment)) {
                (0, fs_1.mkdirSync)(segment);
            }
        }
    }
};
var deleteDirectory = function (dir) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, new Promise(function (resolve, reject) {
                (0, fs_1.access)(dir, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    (0, fs_1.readdir)(dir, function (err, files) {
                        if (err) {
                            return reject(err);
                        }
                        Promise.all(files.map(function (file) { return (0, exports.deleteFile)((0, path_1.join)(dir, file)); })).then(function () {
                            (0, fs_1.rmdir)(dir, function (err) {
                                if (err) {
                                    return reject(err);
                                }
                                resolve();
                            });
                        }).catch(reject);
                    });
                });
            })];
    });
}); };
exports.deleteDirectory = deleteDirectory;
var deleteDirectorySync = function (dir) {
    (0, fs_1.accessSync)(dir);
    var files = (0, fs_1.readdirSync)(dir);
    files.map(function (file) { return (0, exports.deleteFileSync)((0, path_1.join)(dir, file)); });
    (0, fs_1.rmdirSync)(dir);
};
var deleteFile = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, new Promise(function (resolve, reject) {
                (0, fs_1.lstat)(filePath, function (err, stats) {
                    if (err) {
                        return reject(err);
                    }
                    if (stats.isDirectory()) {
                        resolve((0, exports.deleteDirectory)(filePath));
                    }
                    else {
                        (0, fs_1.unlink)(filePath, function (err) {
                            if (err) {
                                return reject(err);
                            }
                            resolve();
                        });
                    }
                });
            })];
    });
}); };
exports.deleteFile = deleteFile;
var deleteFileSync = function (filePath) {
    var stats = (0, fs_1.lstatSync)(filePath);
    if (stats.isDirectory()) {
        deleteDirectorySync(filePath);
    }
    else {
        (0, fs_1.unlinkSync)(filePath);
    }
};
exports.deleteFileSync = deleteFileSync;
var renameFile = function (fileOld, fileNew) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, new Promise(function (resolve, reject) {
                (0, fs_1.rename)(fileOld, fileNew, function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            })];
    });
}); };
exports.renameFile = renameFile;
var renameFileSync = function (fileOld, fileNew) {
    (0, fs_1.renameSync)(fileOld, fileNew);
};
exports.renameFileSync = renameFileSync;
var copyFile = function (filePath, destPath) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2, new Promise(function (resolve, reject) {
                (0, fs_1.copyFile)(filePath, destPath, function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            })];
    });
}); };
exports.copyFile = copyFile;
var copyFileSync = function (filePath, destPath) {
    (0, fs_1.copyFileSync)(filePath, destPath);
};
exports.copyFileSync = copyFileSync;
var isPlatformAvailable = function (path, platform) {
    if (path == null || !(0, fs_1.existsSync)(path)) {
        Logger_1.Logger.getInstance().logWarning("".concat(platform, " Location doesn't exist - Skip ").concat(platform, " instrumentation and configuration."));
        return false;
    }
    return true;
};
exports.isPlatformAvailable = isPlatformAvailable;
var isGradleAvailable = function (isCap) { return isCap !== undefined && isCap
    ? (0, fs_1.existsSync)((0, PathHelper_1.getAndroidGradleFile)((0, PathHelper_1.getAndroidPathCapacitor)()))
    : (0, fs_1.existsSync)((0, PathHelper_1.getAndroidGradleFile)((0, PathHelper_1.getAndroidPath)())); };
exports.isGradleAvailable = isGradleAvailable;
var getPlistAsPath = function (isCap) { return __awaiter(void 0, void 0, void 0, function () {
    var result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, (0, Ios_1.searchForPListFile)()];
            case 1:
                result = _a.sent();
                return [3, 3];
            case 2:
                e_1 = _a.sent();
                if (isCap !== undefined && isCap && (0, fs_1.existsSync)((0, PathHelper_1.getIosPlistPathCapacitor)())) {
                    result = (0, PathHelper_1.getIosPlistPathCapacitor)();
                }
                return [3, 3];
            case 3: return [2, result];
        }
    });
}); };
exports.getPlistAsPath = getPlistAsPath;
var getDynatraceConfigAsObject = function () {
    if ((0, fs_1.existsSync)((0, PathHelper_1.getConfigFilePath)())) {
        return require((0, PathHelper_1.getConfigFilePath)());
    }
    else {
        return undefined;
    }
};
exports.getDynatraceConfigAsObject = getDynatraceConfigAsObject;
var getGradleVersionFileAsString = function () {
    if ((0, fs_1.existsSync)((0, PathHelper_1.getAndroidGradleVersion)())) {
        return (0, exports.readTextFromFileSync)((0, PathHelper_1.getAndroidGradleVersion)());
    }
    else if ((0, fs_1.existsSync)((0, PathHelper_1.getAndroidGradleVersionNewer)())) {
        return (0, exports.readTextFromFileSync)((0, PathHelper_1.getAndroidGradleVersionNewer)());
    }
    else {
        return undefined;
    }
};
exports.getGradleVersionFileAsString = getGradleVersionFileAsString;
