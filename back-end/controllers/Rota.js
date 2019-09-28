const Rota = require('../models/Rota');

const controller = {}; //objeto vazio 

//async = assincrona
controller.novo = async function(req, res){
    try{
        await Rota.create(req.body);
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
        const rotas = await Rota.find()
            .populate('usuario')
            .populate('quilometragem');
        res.send(rotas);
    } catch (erro){
        console.error(erro);
        res.sendStatus(500).end();
    } 
}

controller.obterUm = async function(req, res){
    const id = req.params.id;
    try{
        const rota = await Rota.findById(id)
            .populate('usuario')
            .populate('quilometragem');
        if (rota){ 
            res.send(rota);
        } else {  
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
        const rota = await Rota.findByIdAndUpdate(id, req.body);
        if(rota){
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
        const rota = await Usuario.findByIdAndDelete(id);
        const rota = await Quilometragem.findByIdAndDelete(id);

        if(rota){
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
