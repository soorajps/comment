/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

angular.module('mean.comment').controller('CommentController', ['$scope', '$rootScope', 'Global', 'Comment', 'Menus',

    function($scope, $rootScope, Global, Comment, Menus) {
        $scope.global = Global;
        $scope.Comment = {

            /**
             * @description Init controller
             * @return {null}
             */
            init: function() {
                this.query();
            },

            /**
             * @description Add comment
             * @return {null}
             */
            add: function() {
                var comment = new Comment({
                    content: $scope.Comment.text
                });

                comment.$save(function(res) {
                    $scope.Comment.text = '';
                    $scope.Comment.query();
                });
            },

            /**
             * @description Fetch all 
             * authorised messages
             * @return {null}
             */
            query: function() {
                Comment.query(function(res) {
                    $scope.Comment.dataList = res;
                });
            }
        }

        $scope.Comment.init();
    }
]);