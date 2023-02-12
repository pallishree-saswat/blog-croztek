const mongoose = require('mongoose')
const { Schema } = mongoose

const notificationSchema = new Schema({
    commentId:{
        type: Schema.Types.ObjectId,
        ref: 'comment',
        index:true
    },
    replyId:{
        type: Schema.Types.ObjectId,
        ref: 'reply',
        index:true
    },
    postId:{
        type: Schema.Types.ObjectId,
        ref: 'post',
        index:true
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        index:true
    },
    createdAt:{
        type: Date,
        default: Date.now 
    }
})

module.exports = mongoose.model('notification', notificationSchema)