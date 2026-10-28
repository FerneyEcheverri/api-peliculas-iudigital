const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo']
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Director', directorSchema);