const Usuario = require("../models/Usuario");

const controller = {}; // Objeto vazio

controller.novo = async function(req, res) {
  try {
    await Usuario.create(req.body);
    // HTTP 201: Created
    res.sendStatus(201).end();
  } catch (erro) {
    console.error(erro);
    // HTTP 500: Internal server error
    res.sendStatus(500).end();
  }
};

controller.listar = async function(req, res) {
  try {
    // find() sempre retorna um VETOR,
    // mesmo que vazio
    const usuarios = await Usuario.find().populate("carro"); // Nome do *atributo* (minúsculo)
    res.send(usuarios);
  } catch (erro) {
    console.error(erro);
    res.sendStatus(500).end();
  }
};

controller.obterUm = async function(req, res) {
  const id = req.params.id;
  try {
    const usuario = await Usuario.findById(id).populate("carro");
    if (usuario) {
      // usuario encontrado (variável preenchida)
      res.send(usuario);
    } else {
      // Aluno não encontrado (variável vazia)
      // HTTP 404: Not found
      res.sendStatus(404).end();
    }
  } catch (erro) {
    console.error(erro);
    res.sendStatus(500).end();
  }
};

controller.atualizar = async function(req, res) {
  const id = req.body._id;
  try {
    const usuario = await Usuario.findByIdAndUpdate(id, req.body);
    if (usuario) {
      // HTTP 204: No content
      res.sendStatus(204).end();
    } else {
      res.sendStatus(404).end();
    }
  } catch (erro) {
    console.error(erro);
    res.sendStatus(500).end();
  }
};

controller.excluir = async function(req, res) {
  const id = req.body._id;
  try {
    const usuario = await Usuario.findByIdAndDelete(id);
    if (usuario) {
      res.sendStatus(204).end();
    } else {
      res.sendStatus(404).end();
    }
  } catch (erro) {
    console.error(erro);
    res.sendStatus(500).end();
  }
};

module.exports = controller;
