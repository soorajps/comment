'use strict';
angular.module('mean.comment').directive('messenger', function() {

    return {
        restrict: 'EA',
        scope: {
            article: '='
        },
        templateUrl: 'comment/views/commentDirective.html',

        link: function(scope, el, arg) {
            scope.Comment = scope.$parent.Comment;
            scope.handleKey = function(e) {
                if (e.which === 13 && !!scope.Comment.enterToSubmit) {
                    scope.Comment.add();
                }
            };
        }
    }
});
