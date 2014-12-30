module.exports = function(context) {
    'use strict';

    function recordError(node, origin){
        if(node.type === 'Literal' && (node.value === 'number' || node.value === '[object Number]')) {
            context.report(origin, 'You should use the angular.isNumber method', {});
        }
    }

    return {

        'BinaryExpression': function(node) {

            if(node.operator === '===' || node.operator === '!=='){
                if(node.left.type === 'UnaryExpression' && node.left.operator === 'typeof'){
                    recordError(node.right, node);
                }
                else if(node.right.type === 'UnaryExpression' && node.right.operator === 'typeof'){
                    recordError(node.left, node);
                }
                else {
                    recordError(node.right, node);
                    recordError(node.left, node);
                }
            }
        }
    };
};
