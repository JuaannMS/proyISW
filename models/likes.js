const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema({

    idUsuario:[{
        type:Schema.Types.ObjectId,
        ref: 'usuario'
    }],
    idPublicacion:[{
        type:Schema.Types.ObjectId,
        ref: 'publicacion'
    }],

})

module.exports = mongoose.model('likes', likesSchema);