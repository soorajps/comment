'use strict';

var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var _ = require('lodash');
var ObjectId = mongoose.Types.ObjectId;


module.exports = function(Messages) {

    return {
        /**
         * @description Get message by id
         * @param  {[object]} req
         * @param  {[object]} res
         * @param  {Function} next
         * @param  {[string]} id
         * @return {[object]}
         */
        message: function(req, res, next, id) {
            Message.load(id, function(err, message) {
                if (err) return next(err);
                if (!message) return next(new Error('Failed to load message'));
                req.message = message;
                next();
            });
        },

        /**
         * @description Add message
         * @param {[object]} req
         * @param {[object]} res
         */
        add: function(req, res) {
            var message = new Message(req.body);
            message.user = req.user;
            message.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the article'
                    });
                }
                res.json(message);
            });
        },

        /**
         * @description Update message
         * @param  {object} req
         * @param  {object} res
         * @return {object}
         */
        update: function(req, res) {
            var message = req.message;
            message = _.extend(message, req.body, {
                isAuthorised: !message.isAuthorised
            });
            message.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Update failed'
                    });
                };
                res.json(message);
            });
        },

        /**
         * @description Get All messages
         * @param  {object} req
         * @param  {object} res
         * @return {object}
         */
        all: function(req, res) {
            Message.find().sort('-created').populate('user', 'name username').exec(function(err, messages) {
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
            Message.find({
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