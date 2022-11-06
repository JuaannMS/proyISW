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
    estado:{
        type: String,
        required: true,
        enum: [
            'Activo',
            ]
    }

    //,
    //idUsuario:[{
    //type:Schema.Types.ObjectId,
    //ref: 'usuario'
    //}]
},
{
timestamps:true //fecha creacion y actualizacion
}
)

module.exports = mongoose.model('publicacion', publicacionSchema);