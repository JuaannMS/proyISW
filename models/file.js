const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fileSchema = new Schema({
    url:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    mimeType:{
        type: String,
        required: true,
    },
    idPublicacion:{
        type:Schema.ObjectId,
        ref: 'publicacion',
        required: true,
    }
});

module.exports = mongoose.model('file', fileSchema);