'use strict';

var hasAuthorization = function() {

}

module.exports = function(Comment, app, auth) {
    var comment = require('../controllers/comment')(Comment);

    console.log(comment);
    app.route('/api/comment').get(comment.list).post(comment.add);
    app.route('/api/comment/:commentId').put(comment.update);

    app.route('/api/comments').get(auth.requiresAdmin, comment.all);

    app.param('commentId', comment.comment);
}