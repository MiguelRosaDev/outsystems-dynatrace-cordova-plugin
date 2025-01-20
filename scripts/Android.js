"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeGradleConfig = exports.instrumentAndroidPlatform = exports.getGradleApplyBuildScript = exports.getGradleApplyDynatraceScript = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var FileHelper_1 = require("./helpers/FileHelper");
var Logger_1 = require("./logger/Logger");
var PathHelper_1 = require("./helpers/PathHelper");
var GRADLE_CONFIG_IDENTIFIER = '// AUTO - INSERTED';
var GRADLE_BUILDSCRIPT_IDENTIFIER = 'buildscript';
var OLD_DYNATRACE_PLUGIN = 'dynatrace-cordova-plugin';
var getGradleApplyDynatraceScript = function () { return "apply from: \"".concat((0, PathHelper_1.getDynatraceGradleFile)().split(path_1.sep).join("".concat(path_1.sep + path_1.sep)), "\""); };
exports.getGradleApplyDynatraceScript = getGradleApplyDynatraceScript;
var getGradleApplyBuildScript = function () {
    return "apply from: \"".concat((0, PathHelper_1.getDynatracePluginGradleFile)().split(path_1.sep).join("".concat(path_1.sep + path_1.sep)), "\", to: buildscript");
};
exports.getGradleApplyBuildScript = getGradleApplyBuildScript;
var instrumentAndroidPlatform = function (pathToGradle, remove) {
    if ((0, fs_1.existsSync)(pathToGradle)) {
        if (!pathToGradle.endsWith('.gradle')) {
            throw new Error("Can't find .gradle file. gradle path must also include the gradle file!");
        }
        changeCordovaBuildGradleFile(pathToGradle, remove);
    }
    else {
        throw new Error("Can't find .gradle file. gradle path must also include the gradle file!");
    }
};
exports.instrumentAndroidPlatform = instrumentAndroidPlatform;
var changeCordovaBuildGradleFile = function (pathToGradle, remove) {
    var gradleFileContent = (0, FileHelper_1.readTextFromFileSync)(pathToGradle);
    var gradleFileContentLines = gradleFileContent.split('\n');
    var gradlePluginFileIndex = -1;
    var gradleDynatraceFileIndex = -1;
    for (var i = 0; i < gradleFileContentLines.length && (gradleDynatraceFileIndex === -1 || gradlePluginFileIndex === -1); i++) {
        if (gradleFileContentLines[i].indexOf('plugin.gradle') > -1) {
            gradlePluginFileIndex = i;
        }
        else if (gradleFileContentLines[i].indexOf('dynatrace.gradle') > -1) {
            gradleDynatraceFileIndex = i;
        }
    }
    var modified = false;
    if (remove) {
        if (gradlePluginFileIndex !== -1) {
            gradleFileContentLines.splice(gradlePluginFileIndex, 1);
            modified = true;
        }
        if (gradleDynatraceFileIndex !== -1) {
            gradleFileContentLines.splice(gradleDynatraceFileIndex - (modified ? 1 : 0), 1);
            modified = true;
        }
        if (modified) {
            Logger_1.Logger.getInstance().logInfo('Removed Dynatrace modifications from build.gradle: ' + pathToGradle);
        }
    }
    else {
        var oldPluginValue = gradleFileContentLines[gradlePluginFileIndex];
        var oldDynatraceValue = gradleFileContentLines[gradleDynatraceFileIndex];
        if (gradlePluginFileIndex === -1 || (oldPluginValue !== undefined && oldPluginValue.includes(OLD_DYNATRACE_PLUGIN))) {
            if (oldPluginValue !== undefined && oldPluginValue.includes(OLD_DYNATRACE_PLUGIN)) {
                gradleFileContentLines.splice(gradlePluginFileIndex, 1);
            }
            var gradleFileCordovaIndex = -1;
            for (var i = 0; i < gradleFileContentLines.length; i++) {
                if (gradleFileContentLines[i].startsWith(GRADLE_BUILDSCRIPT_IDENTIFIER)) {
                    gradleFileCordovaIndex = i;
                    break;
                }
            }
            if (gradleFileCordovaIndex === -1) {
                throw new Error('Could not find Buildscript block in build.gradle.');
            }
            gradleFileContentLines.splice(gradleFileCordovaIndex + 1, 0, (0, exports.getGradleApplyBuildScript)());
            modified = true;
        }
        if (gradleDynatraceFileIndex === -1 || (oldDynatraceValue !== undefined && oldDynatraceValue.includes(OLD_DYNATRACE_PLUGIN))) {
            if (oldDynatraceValue !== undefined && oldDynatraceValue.includes(OLD_DYNATRACE_PLUGIN)) {
                gradleFileContentLines.splice(gradleDynatraceFileIndex, 1);
            }
            gradleFileContentLines.splice(gradleFileContentLines.length, 0, (0, exports.getGradleApplyDynatraceScript)());
            modified = true;
        }
        if (modified) {
            Logger_1.Logger.getInstance().logInfo('Added Dynatrace plugin.gradle to the build.gradle: ' + pathToGradle);
        }
        else {
            Logger_1.Logger.getInstance().logInfo('Dynatrace plugin & agent already added to build.gradle');
        }
    }
    if (modified) {
        var fullGradleFile = gradleFileContentLines.join('\n');
        (0, FileHelper_1.writeTextToFileSync)(pathToGradle, fullGradleFile);
    }
};
var writeGradleConfig = function (androidConfig) {
    if (!androidConfig.isConfigurationAvailable()) {
        Logger_1.Logger.getInstance().logWarning("Can't write configuration of Android agent because it is missing!");
        return;
    }
    var gradleFileContent = (0, FileHelper_1.readTextFromFileSync)((0, PathHelper_1.getDynatraceGradleFile)());
    var gradleFileContentLines = removeOldGradleConfig(gradleFileContent);
    var gradleFileIndex = -1;
    for (var i = 0; i < gradleFileContentLines.length; i++) {
        if (gradleFileContentLines[i].indexOf(GRADLE_CONFIG_IDENTIFIER) > -1) {
            gradleFileIndex = i;
            break;
        }
    }
    gradleFileContentLines.splice(gradleFileIndex + 1, 0, androidConfig.getConfiguration());
    var fullGradleFile = gradleFileContentLines.join('\n');
    (0, FileHelper_1.writeTextToFileSync)((0, PathHelper_1.getDynatraceGradleFile)(), fullGradleFile);
    Logger_1.Logger.getInstance().logInfo('Replaced old configuration with current configuration in dynatrace.gradle');
};
exports.writeGradleConfig = writeGradleConfig;
var removeOldGradleConfig = function (gradleFileContent) {
    var gradleFileContentLines = gradleFileContent.split('\n');
    var gradleConfigIndex = [];
    for (var i = 0; i < gradleFileContentLines.length && gradleConfigIndex.length < 2; i++) {
        if (gradleFileContentLines[i].indexOf(GRADLE_CONFIG_IDENTIFIER) > -1) {
            gradleConfigIndex.push(i);
        }
    }
    if (gradleConfigIndex.length !== 2) {
        throw new Error('Could not find identifier in internal gradle file. Please re-install.');
    }
    gradleFileContentLines.splice(gradleConfigIndex[0] + 1, gradleConfigIndex[1] - (gradleConfigIndex[0] + 1));
    return gradleFileContentLines;
};
