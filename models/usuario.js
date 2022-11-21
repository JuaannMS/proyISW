const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    rut: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    direccion: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    fechaCumpleanio: {
        type: Date,
        required: true
    },
    correo: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100
    },
    telefono: {
        type: Number,
        required: true,
        minLength: 9,
        maxLength: 15
    },
    idPublicacion: {
        type: [Schema.ObjectId],
        ref: 'publicacion',
        default: []
    }

},
    {
        timestamps: true //fecha creacion y actualizacion
    }
)

module.exports = mongoose.model('usuario', usuarioSchema);