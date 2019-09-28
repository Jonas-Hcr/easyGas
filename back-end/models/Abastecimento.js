const mongoose = require('mongoose');

const schema = mongoose.Schema({
   litros: {
      type: String,
      required: true
   },
   valor_litro: {
      type: Number,
      required: true,
   },
   valor_total: {
      type: Number,
      required: true
   },
   carro: {
      type: mongoose.ObjectId,
      ref: 'Carro',
      required: true
   },
   usuario: {
      type: mongoose.ObjectId,
      ref: 'Usuario',
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
module.exports = mongoose.model('Abastecimento', schema, 'abastecimentos');