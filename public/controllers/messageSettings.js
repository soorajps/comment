'use strict';

angular.module('mean.message').controller('MessageSettingsCtrl', ['$scope', 'Message',

    function($scope, Message) {

        $scope.Message = {
            /**
             * @description Init controller
             * @return {nul}
             */
            init: function() {
                this.queryMessage();
            },

            /**
             * @description Approve message
             * @param  {string} id
             * @return {null}
             */
            approveMessage: function(id) {
                var self = this,
                    message = this.getMessageById(id);

                message.$update(function(res) {
                    self.queryMessage();
                });
            },

            /**
             * @description Fetch all messages
             * @return {null}
             */
            queryMessage: function() {
                Message.all(function(res) {
                    $scope.messages = res;
                });
            },

            /**
             * @description  Pick message from messages wrt id
             * @param  {string} id
             * @return {object}
             */
            getMessageById: function(id) {
                return $.grep($scope.messages, function(o) {
                    return o._id == id;
                })[0];
            }
        }

        $scope.Message.init();

    }
]);