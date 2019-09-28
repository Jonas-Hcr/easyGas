const mongoose = require('mongoose');

const schema = mongoose.Schema({
   nome: {
      type: String,
      required: true
   },
   login: {
      type: String,
      required: true
   },
   senha: {
      type: String,
      required: true
   },
   carro: {
      type: mongoose.ObjectId,
      ref: 'Carro'
   }
});

// Parâmetros de mongoose.model():
// 1º -> nome do model
// 2º -> estrutura de atributos do model (schema)
// 3º -> nome da collection do MongoDB onde
//       os objetos desse model serão armazenados
//       (geralmente, o nome do model em
//       minúsculas e no plural)
module.exports = mongoose.model('Usuario', schema, 'usuarios');