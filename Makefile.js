/**
 * @fileoverview Build file
 * @author nzakas
 */
/*global cat, cd, cp, echo, exec, exit, find, mkdir, mv, pwd, rm, target, test*/

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

require('shelljs/make');

var path = require('path'),
    nodeCLI = require('shelljs-nodecli');
//------------------------------------------------------------------------------
// Settings
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Data
//------------------------------------------------------------------------------

var NODE = 'node ', // intentional extra space
    NODE_MODULES = './node_modules/',

    // Utilities - intentional extra space at the end of each string
    MOCHA = NODE_MODULES + 'mocha/bin/_mocha ',
    ESLINT = NODE + ' bin/eslint.js ',

    // Files
    TEST_FILES = find('test/').filter(fileType('js')).join(' ');

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Generates a function that matches files with a particular extension.
 * @param {string} extension The file extension (i.e. "js")
 * @returns {Function} The function to pass into a filter method.
 * @private
 */
function fileType(extension) {
    return function(filename) {
        return filename.substring(filename.lastIndexOf('.') + 1) === extension;
    };
}


target.test = function() {
    var errors = 0,
        lastReturn;

    // exec(ISTANBUL + " cover " + MOCHA + "-- -c " + TEST_FILES);
    lastReturn = nodeCLI.exec('istanbul', 'cover', MOCHA, '-- -c', TEST_FILES);
    if (lastReturn.code !== 0) {
      errors++;
    }

    // exec(ISTANBUL + "check-coverage --statement 99 --branch 98 --function 99 --lines 99");
    lastReturn = nodeCLI.exec('istanbul', 'check-coverage', '--statement 99 --branch 98 --function 99 --lines 99');
    if (lastReturn.code !== 0) {
      errors++;
    }

    if (errors) {
        exit(1);
    }
};
