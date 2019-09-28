const Quilometragem = require('../models/Quilometragem');

const controller = {}; //objeto vazio 

//async = assincrona
controller.novo = async function(req, res){
    try{
        await Quilometragem.create(req.body);
        //HTTP 201: Created
        res.sendStatus(201).end();
    }
    catch(erro){
        console.error(erro);
        // HTTP 500: Internal serer error
        res.sendStatus(500).end();
    }
};

controller.listar = async function(req, res) {
    try{
        //cursoS porque retorna um vetor(mesmo que vazio)
        const quilometragem = await Quilometragem.find();
        res.send(quilometragem);
    } catch (erro){
        console.error(erro);
        res.sendStatus(500).end();
    }
}

controller.obterUm = async function(req, res){
    const id = req.params.id;
    try{
        //quilometragem porque retorna um valor apenas
        const quilometragem = await Quilometragem.findById(id);
        if (quilometragem){ //quilometragem encontrado(variável preenchida)
            res.send(quilometragem);
        } else {  //quilometragem não encontrado (var vazia)
            //HTTP 404: Not Found
            res.SendStatus(404).end();
        }
    } catch(erro){
        console.erro(erro);
        res.sendStatus(500).end();
    }
}

controller.atualizar = async function(req, res) {
    const id = req.body._id;
    try{
        const quilometragem = await Quilometragem.findByIdAndUpdate(id, req.body);
        if(quilometragem){
            //HTPP 204: No content
            res.sendStatus(204).end();
        }
        else {
            res.sendStatus(404).end();
        }
    }
    catch(erro){
        console.error(erro);
        res.sendStatus(500).end();
    }
};

controller.excluir = async function(req, res){
    id = req.body._id;
    try{
        const quilometragem = await Quilometragem.findByIdAndDelete(id);
        if(quilometragem){
            res.sendStatus(204).end();
        } else{
            res.sendStatus(404).end();
        }
    } 
    catch(erro) {
        console.error(erro);
        res.sendStatus(500).end();
    }
};

module.exports = controller;
