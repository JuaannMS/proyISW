const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reporteSchema = new Schema({
    id_:{
        type:Schema.ObjectId,
        require:false
    },
    idUsuario:[{
        type:Schema.ObjectId,
        ref: 'usuario'
    }],
    idPublicacion:[{
        type:Schema.ObjectId,
        ref: 'publicacion'
    }]
})

