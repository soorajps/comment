'use strict';
angular.module('mean.message').directive('messenger', function() {

    return {
        restrict: 'EA',
        scope: {
            article: '='
        },
        templateUrl: 'message/views/messageDirective.html',

        link: function(scope, el, arg) {
            scope.Message = scope.$parent.Message;
            scope.handleKey = function(e) {
                if (e.which === 13 && !!scope.Message.enterToSubmit) {
                    scope.Message.add();
                }
            };
        }
    }
});
