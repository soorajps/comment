'use strict';

var hasAuthorization = function() {

}

module.exports = function(Message, app, auth) {
    var message = require('../controllers/message')(Message);

    app.route('/api/message').get(message.list).post(message.add);
    app.route('/api/message/:messageId').put(message.update);

    app.route('/api/messages').get(auth.requiresAdmin, message.all);

    app.param('messageId', message.message);
}