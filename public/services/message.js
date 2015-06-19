'use strict';

angular.module('mean.message').factory('Message', ['$resource',
    function($resource) {
        return $resource('api/message/:messageId/', {
            messageId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            all: {
                url: 'api/messages/',
                method: 'GET',
                isArray: true
            }
        });
    }
]);