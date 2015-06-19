'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * [MessageSchema]
 * @type {Schema}
 */
var MessageSchema = new Schema({
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


MessageSchema.path('content').validate(function(content) {
    return content.length;
}, 'Please enter a valid message.');


MessageSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};


mongoose.model('Message', MessageSchema);