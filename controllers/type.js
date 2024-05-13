const typeService = require('../services/type')

async function list(req, res) {
    const types = await typeService.findAll();
    res.status(200).json(types);
}

async function read(req, res) {
    const typeId = parseInt(req.params.id);
    const type = await typeService.find(typeId);
    if (type)
      res.status(200).json(type);
    else
      res.status(404).json({ message: "Type non trouvé" });
}

async function create(req, res){
    const datas = req.body
    const createdType = typeService.create(datas)
    if (createdType){
        res.status(201).json({ message: "Type créé" })
    }
    else{
        res.status(400).json({ message: "Erreur lors de l'insertion" })
    }
}

async function update(req, res){
    const typeId = parseInt(req.params.id)
    const datas = req.body
    const updatedType = typeService.update(typeId, datas)
    if (updatedType){
        res.status(200).json({message: "Type édité"})
    }
    else{
        res.status(400).json({message: "Erreur lors de l'édition"})
    }
}

async function remove(req, res) {
    const typeId = parseInt(req.params.id);
    const removedType = typeService.remove(typeId);
    if (removedType) {
      res.status(200).json({ message: "Type supprimé" });
    } else {
      res.status(400).json({ message: "Erreur lors de la suppression" });
    }
}

module.exports = {
    list,
    read,
    create,
    update,
    remove
};