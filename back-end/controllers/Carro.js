const Carro = require('../models/Carro');

const controller = {}; // Objeto vazio

controller.novo = async function(req, res) {
   try {
      await Carro.create(req.body);
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
      const carros = await Carro.find();
      res.send(carros);
   }
   catch(erro) {
      console.error(erro);
      res.sendStatus(500).end();
   }
}

controller.obterUm = async function(req, res) {
   const id = req.params.id;
   try {
      const carro = await Carro.findById(id);
      if(carro) {    // carro encontrado (variável preenchida)
         res.send(carro);
      }
      else {      // Curso não encontrado (variável vazia)
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
      const carro = await Carro.findByIdAndUpdate(id, req.body);
      if(carro) {
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
      const carro = await Carro.findByIdAndDelete(id);
      if(carro) {
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