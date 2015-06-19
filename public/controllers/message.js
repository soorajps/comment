/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

angular.module('mean.message').controller('MessageController', ['$scope', '$rootScope', 'Global', 'Message', 'Menus',

    function($scope, $rootScope, Global, Message, Menus) {
        $scope.global = Global;
        $scope.Message = {

            /**
             * @description Init controller
             * @return {null}
             */
            init: function() {
                this.query();
            },

            /**
             * @description Add message
             * @return {null}
             */
            add: function() {
                var message = new Message({
                    content: $scope.Message.text
                });

                message.$save(function(res) {
                    $scope.Message.text = '';
                    $scope.Message.query();
                });
            },

            /**
             * @description Fetch all 
             * authorised messages
             * @return {null}
             */
            query: function() {
                Message.query(function(res) {
                    $scope.Message.dataList = res;
                });
            }
        }

        $scope.Message.init();
    }
]);