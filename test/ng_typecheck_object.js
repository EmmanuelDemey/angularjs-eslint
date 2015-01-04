//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_typecheck_object', {
    valid: [
        'angular.isObject({})'
    ],
    invalid: [
        { code: 'typeof variable === "[object Object]"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"[object Object]" === typeof variable', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: 'variable === "[object Object]"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"[object Object]" === variable', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: 'typeof variable !== "[object Object]"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"[object Object]" !== typeof variable', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: 'variable !== "[object Object]"', errors: [{ message: 'You should use the angular.isObject method'}] },
        { code: '"[object Object]" !== variable', errors: [{ message: 'You should use the angular.isObject method'}] }
    ]
});
