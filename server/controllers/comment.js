'use strict';

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var _ = require('lodash');
var ObjectId = mongoose.Types.ObjectId;


module.exports = function(Comments) {

    return {
        /**
         * @description Get comment by id
         * @param  {[object]} req
         * @param  {[object]} res
         * @param  {Function} next
         * @param  {[string]} id
         * @return {[object]}
         */
        comment: function(req, res, next, id) {
            Comment.load(id, function(err, comment) {
                if (err) return next(err);
                if (!comment) return next(new Error('Failed to load comment'));
                req.comment = comment;
                next();
            });
        },

        /**
         * @description Add comment
         * @param {[object]} req
         * @param {[object]} res
         */
        add: function(req, res) {
            var comment = new Comment(req.body);
            comment.user = req.user;
            comment.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the article'
                    });
                }
                res.json(comment);
            });
        },

        /**
         * @description Update comment
         * @param  {object} req
         * @param  {object} res
         * @return {object}
         */
        update: function(req, res) {
            var comment = req.comment;
            comment = _.extend(comment, req.body, {
                isAuthorised: !comment.isAuthorised
            });
            comment.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Update failed'
                    });
                };
                res.json(comment);
            });
        },

        /**
         * @description Get All messages
         * @param  {object} req
         * @param  {object} res
         * @return {object}
         */
        all: function(req, res) {
            Comment.find().sort('-created').populate('user', 'name username').exec(function(err, messages) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the messages'
                    });
                }
                res.json(messages);
            });
        },


        /**
         * @description List all authorised messages
         * @param  {object} req
         * @param  {object} res
         * @return {object}
         */
        list: function(req, res) {
            Comment.find({
                $or: [{
                    isAuthorised: true
                }, {
                    user: ObjectId(req.user._id)
                }]
            }).sort('-created').populate('user', 'name username').exec(function(err, messages) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the messages'
                    });
                }
                res.json(messages);
            });
        }
    }
}