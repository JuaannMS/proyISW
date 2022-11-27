const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reporteSchema = new Schema({

    /*reportar una publicación de un usuario. el reporte lleva un comentario con el motivo o la explicación del reporte y una escala para clasificar la severidad del reporte*/
    idPublicacion:{
        type:Schema.ObjectId,
        ref: 'publicacion',
        required: true
    },motivo: {
        type: String,
        required:true,
        minLength:1,
        maxLength:200
    },gravedad: {
        type: String,
        required: true,
        enum: [
        //la publicación es una falta ....
            'leve', 'moderada', 'grave']
        //.. a las normas de la comunidad
    }
});

module.exports = mongoose.model('reporte', reporteSchema);
