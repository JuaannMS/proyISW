const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicacionSchema = new Schema({
    id_:{
        type:Schema.ObjectId,
        required:false
    },

    titulo:{
        type: String,
        required:true,
        minLength:1,
        maxLength:100
    },
    etiqueta:{
        type: String,
        required:false,
        minLength:1,
        maxLength:100
    },
    descripcion:{
        type: String,
        required:true,
        minLength:1,
        maxLength:400
    },

    //,
    //idUsuario:[{
    //type:Schema.Types.ObjectId,
    //ref: 'usuario'
    //}]
})

module.exports = mongoose.model('publicacion', publicacionSchema);