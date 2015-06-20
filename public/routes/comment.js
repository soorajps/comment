/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
angular.module('mean.comment').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('comment settings', {
            url: '/comment/settings',
            templateUrl: 'comment/views/commentSettings.html',
            controller:'CommentSettingsCtrl',
            resolve: {
                isAdmin: function(MeanUser) {
                    return MeanUser.checkAdmin();
                }
            }
        });
    }
]);