const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reporteSchema = new Schema({

    idPublicacion:{
        type:Schema.ObjectId,
        ref: 'publicacion',
        required: true
    }
});

module.exports = mongoose.model('reporte', reporteSchema);
