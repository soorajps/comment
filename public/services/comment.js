'use strict';

angular.module('mean.comment').factory('Comment', ['$resource',
    function($resource) {
        return $resource('api/comment/:commentId/', {
            commentId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            all: {
                url: 'api/comments/',
                method: 'GET',
                isArray: true
            }
        });
    }
]);