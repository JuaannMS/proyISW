const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoritoSchema = new Schema({
    idUsuario:{
        type:Schema.ObjectId,
        ref: 'usuario',
        required: true
    },
    idFavoritos:{
        type:[Schema.ObjectId],
        ref: 'publicacion',
        required: true
    }
});

module.exports = mongoose.model('favorito', favoritoSchema);