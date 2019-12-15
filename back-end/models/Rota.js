const mongoose = require('mongoose');

const schema = mongoose.Schema({
    partida:{
        type: String,
        required: true,
    },
    destino:{
        type: String,
        required: true,
    },
    favorita:{
        type: Boolean,
        default: false,
    },
    usuario:{
        type: mongoose.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    quilometragem:{
        type: mongoose.ObjectId,
        ref: 'Quilometragem',
        required: false,
    }
});


module.exports = mongoose.model('Rota', schema, 'rotas');
