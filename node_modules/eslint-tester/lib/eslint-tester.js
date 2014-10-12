/**
 * @fileoverview Mocha test wrapper
 * @author Ilya Volodin
 */
"use strict";
/*global describe, it*/

/*
 * This is a wrapper around mocha to allow for DRY unittests for eslint
 * Format:
 * eslintTester.add("{ruleName}", {
 *      valid: [
 *          "{code}",
 *          { code: "{code}", args: {args}, global: {globals}, globals: {globals}, settings: {settings} }
 *      ],
 *      invalid: [
 *          { code: "{code}", errors: {numErrors} },
 *          { code: "{code}", args: {args}, global: {globals}, settings: {settings} errors: [{ message: "{errorMessage}", type: "{errorNodeType}"}] }
 *      ]
 *  });
 *
 * Variables:
 * {code} - String that represents the code to be tested
 * {args} - Arguments that are passed to the configurable rules. If not
 *          supplied "1" is passed to the rule
 * {globals} - An object representing a list of variables that are
 *             registered as globals
 * {settings} - An object representing global settings for all rules
 * {numErrors} - If failing case doesn't need to check error message,
 *               this integer will specify how many errors should be
 *               received
 * {errorMessage} - Message that is returned by the rule on failure
 * {errorNodeType} - AST node type that is returned by they rule as
 *                   a cause of the failure.
 *
 * Requirements:
 * Each rule has to have at least one invalid and at least one valid check.
 * If one of them is missing, the test will be marked as failed.
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var assert = require("chai").assert,
    util = require("util"),
    path = require("path");

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Creates a new instance of ESLintTester.
 * @param {ESLint} eslint The ESLint instance to use.
 * @constructor
 */
function ESLintTester(eslint) {

    /**
     * The internal linter to use.
     * @type {ESLint}
     */
    this.eslint = eslint;
}

ESLintTester.prototype = {

    /**
     * Adds a new rule test to execute.
     * @param {string} rulePath The path to the rule to test.
     * @param {Object} test The collection of tests to run.
     * @returns {void}
     */
    addRuleTest: function(rulePath, test) {

        var eslint = this.eslint,
            result = {},
            ruleName = path.basename(rulePath);

        //all valid cases go through this.
        function testValidTemplate(ruleName, item) {
            var config = { rules: {} };

            if (item.globals || item.global) {
                config.global = item.globals ? item.globals : item.global;
            }

            config.settings = item.settings;

            config.rules[ruleName] = item.args ? item.args : 1;

            eslint.defineRule(ruleName, require(path.resolve(process.cwd(), rulePath)));
            var messages = eslint.verify(item.code ? item.code : item, config);

            assert.equal(messages.length, 0, util.format("Should have no errors but had %d: %s",
                        messages.length, util.inspect(messages)));
        }

        //all invalid cases go through this.
        function testInvalidTemplate(ruleName, item) {
            var config = { rules: {} };

            if (item.globals || item.global) {
                config.global = item.globals ? item.globals : item.global;
            }

            config.settings = item.settings;

            config.rules[ruleName] = item.args ? item.args : 1;

            eslint.defineRule(ruleName, require(path.resolve(process.cwd(), rulePath)));

            var messages = eslint.verify(item.code, config);

            if (typeof item.errors === "number") {
                assert.equal(messages.length, item.errors,  util.format("Should have %d errors but had %d: %s",
                    item.errors, messages.length, util.inspect(messages)));
            } else {
                assert.equal(messages.length, item.errors.length,
                    util.format("Should have %d errors but had %d: %s",
                    item.errors.length, messages.length, util.inspect(messages)));

                for (var i = 0, l = item.errors.length; i < l; i++) {
                    assert.ok(!("fatal" in messages[i]), "A fatal parsing error occurred: " + messages[i].message);
                    assert.equal(messages[i].ruleId, ruleName, "Error rule name should be the same as the name of the rule being tested");
                    if (item.errors[i].message) {
                        assert.equal(messages[i].message, item.errors[i].message, "Error message should be " + item.errors[i].message);
                    }
                    if (item.errors[i].type) {
                        assert.equal(messages[i].node.type, item.errors[i].type, "Error type should be " + item.errors[i].type);
                    }
                    if (item.errors[i].line) {
                        assert.equal(messages[i].line, item.errors[i].line, "Error line should be " + item.errors[i].line);
                    }
                    if (item.errors[i].column) {
                        assert.equal(messages[i].column, item.errors[i].column, "Error column should be " + item.errors[i].column);
                    }
                }
            }
        }

        //this creates a mocha test suite and pipes all supplied info
        //through one of the templates above.
        describe(ruleName, function() {
            if (!test.valid || test.valid.length < 1) {
                //we only want to run this assertion when it's going to
                //fail, so we wouldn't artificially boost test count
                it("should have at least one valid test", function() {
                    assert.equal(test.valid ? test.valid.length : 0, 1, "Each rule should have at least one valid test");
                });
            } else {
                test.valid.forEach(function(valid) {
                    it(valid.code || valid, function() {
                        testValidTemplate(ruleName, valid);
                    });
                });
            }
            if (!test.invalid || test.invalid.length < 1) {
                //we only want to run this assertion when it's going to
                //fail, so we wouldn't artificially boost test count
                it("should have at least one invalid test", function() {
                    assert.equal(test.invalid ? test.invalid.length : 0, 1, "Each rule should have at least one invalid test");
                });
            } else {
                test.invalid.forEach(function(invalid) {
                    it(invalid.code, function() {
                        testInvalidTemplate(ruleName, invalid);
                    });
                });
            }
        });

        return result.suite;
    }
};


module.exports = ESLintTester;
