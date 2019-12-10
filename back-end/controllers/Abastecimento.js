const Abastecimento = require('../models/Abastecimento');

const controller = {}; // Objeto vazio

controller.novo = async function(req, res) {
   try {
      await Abastecimento.create(req.body);
      // HTTP 201: Created
      res.status(201).send('');
   }
   catch(erro) {
      console.error(erro);
      // HTTP 500: Internal server error
      res.sendStatus(500).end();
   }
}

controller.listar = async function(req, res) {
   try {
      // find() sempre retorna um VETOR,
      // mesmo que vazio
      const abastecimentos = await 
         Abastecimento.find()
           .populate('carro') // Nome do *atributo* (minúsculo)
           .populate('usuario')
      ;
      res.send(abastecimentos);
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.obterUm = async function(req, res) {
   const id = req.params.id;
   try {
      const abastecimento = await Abastecimento.findById(id)
         .populate('carro') // Nome do *atributo* (minúsculo)
         .populate('usuario')
      if(abastecimento) {    // Avaliação encontrada (variável preenchida)
         res.send(abastecimento);
      }
      else {      // Avaliação não encontrada (variável vazia)
         // HTTP 404: Not found
         res.sendStatus(404).end();
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.atualizar = async function(req, res) {
   const id = req.body._id;
   try {
      const abastecimento = await Abastecimento.findByIdAndUpdate(id, req.body);
      if(abastecimento) {
         // HTTP 204: No content
         res.sendStatus(204).end();
      }
      else {
         res.sendStatus(404).end();
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.excluir = async function(req, res) {
   const id = req.body._id;
   try {
      const abastecimento = await Abastecimento.findByIdAndDelete(id);
      if(abastecimento) {
         res.sendStatus(204).end();
      }
      else {
         res.sendStatus(404).end();
      }
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

module.exports = controller;