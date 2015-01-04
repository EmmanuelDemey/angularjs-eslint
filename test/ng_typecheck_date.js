//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require('../node_modules/eslint/lib/eslint'),
    ESLintTester = require('eslint-tester');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('rules/ng_typecheck_date', {
    valid: [
        'angular.isDate(variable)'
    ],
    invalid: [
        { code: 'typeof variable === "[object Date]"', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: '"[object Date]" === typeof variable', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: 'variable === "[object Date]"', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: '"[object Date]" === variable', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: 'typeof variable !== "[object Date]"', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: '"[object Date]" !== typeof variable', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: 'variable !== "[object Date]"', errors: [{ message: 'You should use the angular.isDate method'}] },
        { code: '"[object Date]" !== variable', errors: [{ message: 'You should use the angular.isDate method'}] }
    ]
});
