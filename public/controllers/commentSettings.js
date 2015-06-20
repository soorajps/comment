'use strict';

angular.module('mean.comment').controller('CommentSettingsCtrl', ['$scope', 'Comment',

    function($scope, Comment) {

        $scope.Comment = {
            /**
             * @description Init controller
             * @return {nul}
             */
            init: function() {
                this.queryComment();
            },

            /**
             * @description Approve comment
             * @param  {string} id
             * @return {null}
             */
            approveComment: function(id) {
                var self = this,
                    comment = this.getCommentById(id);

                comment.$update(function(res) {
                    self.queryComment();
                });
            },

            /**
             * @description Fetch all comments
             * @return {null}
             */
            queryComment: function() {
                Comment.all(function(res) {
                    $scope.comments = res;
                });
            },

            /**
             * @description  Pick comment from comments wrt id
             * @param  {string} id
             * @return {object}
             */
            getCommentById: function(id) {
                return $.grep($scope.comments, function(o) {
                    return o._id == id;
                })[0];
            }
        }

        $scope.Comment.init();

    }
]);