/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
angular.module('mean.message').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('message settings', {
            url: '/message/settings',
            templateUrl: 'message/views/messageSettings.html',
            controller:'MessageSettingsCtrl',
            resolve: {
                isAdmin: function(MeanUser) {
                    return MeanUser.checkAdmin();
                }
            }
        });
    }
]);