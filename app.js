/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

var Module = require('meanio').Module;
var Message = new Module('message');


Message.register(function(app, auth, database) {

    Message.routes(app, auth, database);
    Message.aggregateAsset('css', 'message.css');
    Message.angularDependencies(['mean.system']);

    Message.menus.add({
    	'roles':['admin'],
    	'title':'Message settings',
    	'link':'message settings',
    	'menu':'main'
    });

    return Message;
});