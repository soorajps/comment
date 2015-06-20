/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var Module = require('meanio').Module;
var Comment = new Module('comment');


Comment.register(function(app, auth, database) {

    Comment.routes(app, auth, database);
    Comment.aggregateAsset('css', 'comment.css');
    Comment.angularDependencies(['mean.system']);

    Comment.menus.add({
    	'roles':['admin'],
    	'title':'Message settings',
    	'link':'comment settings',
    	'menu':'main'
    });

    return Comment;
});