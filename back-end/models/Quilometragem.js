const mongoose = require('mongoose');

const schema = mongoose.Schema({
    distancia:{
        type: Number,
        required: true,
    },
    tempo_gasto:{
        type: Number,
        required: true,
    },
    data:{
        type: Date,
        required: true,
    }
});

//Parâmetros de mongoose.model():
//1º -> nome do model
//2º -> estrutura de atributos do model (schema)
//3º -> nome da collection do MongoDb onde os objetos desse model serão armazenados (geralmente, o nome do model em minúscula e no plural).
module.exports = mongoose.model('Quilometragem', schema, 'quilometragens');
