const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reporteSchema = new Schema({
    id_:{
        type:Schema.ObjectId,
        require:false
    },
    idUsuario:[{
        type:Schema.Types.ObjectId,
        ref: 'usuario'
    }],
    idPublicacion:[{
        type:Schema.Types.ObjectId,
        ref: 'publicacion'
    }]
})

