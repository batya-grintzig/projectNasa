const mongoose = require('mongoose');
const pictureSchema = mongoose.Schema({
    date: {
        type: String,
        // required: true
    },
    explanation: {
        type: String,
        required: false
    },
    hdurl: {
        type: String,
        required: false
    },
    media_type: {
        type: String,
        required: false
    },
    service_version: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    url: {
        type: String,
        // required: true
    },
    open:{
        type: Boolean,
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    
})

module.exports = mongoose.model('Picture', pictureSchema)