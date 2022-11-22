const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema({

    idUsuario:{
        type:Schema.ObjectId,
        ref: 'usuario'
    },
    idPublicacion:{
        type:Schema.ObjectId,
        ref: 'publicacion'
    },

})

module.exports = mongoose.model('likes', likesSchema);