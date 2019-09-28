const mongoose = require('mongoose');

const schema = mongoose.Schema({
   placa: {
      type: String,
      required: true
   },
   marca: {
      type: String
   },
   modelo: {
      type: String,
      required: true
   },
   km_litro: {
      type: Number,
      required: true
   }
});

// Parâmetros de mongoose.model():
// 1º -> nome do model
// 2º -> estrutura de atributos do model (schema)
// 3º -> nome da collection do MongoDB onde
//       os objetos desse model serão armazenados
//       (geralmente, o nome do model em
//       minúsculas e no plural)
module.exports = mongoose.model('Carro', schema, 'carros');