const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicacionSchema = new Schema({

    titulo:{
        type: String,
        required:true,
        minLength:1,
        maxLength:100
    },
    etiqueta:{
        type: String,
        required:true,
        minLength:1,
        maxLength:100,
        default:0
    },
    descripcion:{
        type: String,
        required:true,
        minLength:1,
        maxLength:400
    },
    estado:{
        type: Boolean,
        required: false,
        default: true
    },
    cantLikes:{
        type: Number,
        required: false,
        minLength:0,
        default:0
    },
    idUsuario:{
    type:Schema.ObjectId,
    required: true,
    ref: 'usuario'
    },
    idReportes:{
        type: [Schema.ObjectId],
        ref: 'reporte',
        default: []
    }
},
{
timestamps:true //fecha creacion y actualizacion
}
)

module.exports = mongoose.model('publicacion', publicacionSchema);