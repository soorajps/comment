'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * [CommentSchema]
 * @type {Schema}
 */
var CommentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    },
    articleId: {
        type: Schema.ObjectId,
        ref: 'Article'
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        index: true
    },
    userPicture: {
        type: String
    },
    isAuthorised: {
        type: Boolean,
        default: false
    }
});


CommentSchema.path('content').validate(function(content) {
    return content.length;
}, 'Please enter a valid comment.');


CommentSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};


mongoose.model('Comment', CommentSchema);