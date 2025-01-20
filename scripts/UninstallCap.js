"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InstallHelper_1 = require("./helpers/InstallHelper");
var PathHelper_1 = require("./helpers/PathHelper");
module.exports = (function (context) {
    if ((0, PathHelper_1.isCapacitorApp)()) {
        return new Promise(function (resolve) {
            (0, InstallHelper_1.modifyPackageJsonCap)(false, (0, InstallHelper_1.isOptOut)((0, InstallHelper_1.parsedNpmConfig)())).then(function () { return (0, InstallHelper_1.removeGradleModification)(); }).then(function () { return (0, InstallHelper_1.removePListModification)(); }).then(function () {
                resolve('');
            });
        });
    }
})();
