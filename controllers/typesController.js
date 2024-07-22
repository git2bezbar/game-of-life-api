const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
  * Provides all the existing types.
  * @example
  * ```js
  * getAllTypes(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} All the types.
  */

async function getAllTypes(req, res) {
  const types = await prisma.type.findMany()
  res.status(200).json(types)
}

/**
  * Provides information about a specific type.
  * @example
  * ```js
  * getType(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} The provided type.
  * @throws 404 if the typeId is not defined.
  */
async function getType(req, res) {
  const typeId = parseInt(req.params.id)
  const type = await prisma.type.findFirst({ where: { id: typeId } })

  if (!type) res.status(404).json({ message: "Le type n'existe pas" })

  res.status(200).json(type)
}

/**
  * Creates a new type.
  * @example
  * ```js
  * createType(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} The created type.
  * @throws 400 if the type could not be created.
  */

async function createType(req, res) {
  let type
  const { name, description } = req.body
  
  try {
    type = await prisma.type.create({ data: { name, description } })
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création" })
  }

  res.status(201).json(type)
}

/**
  * Updates a type.
  * @example
  * ```js
  * updateType(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} The updated type.
  * @throws 404 if the type does not exist or 400 if the type could not be updated.
  *  
  */

async function updateType(req, res) {
  let updatedType
  const typeId = parseInt(req.params.id)
  const type = await prisma.type.findFirst({ where: { id: typeId } })
  
  if (!type) res.status(404).json({ message: "Le type n'existe pas" })
    
  const { name, description } = req.body

  try {
    updatedType = await prisma.type.update({ where: { id: typeId }, data: { name, description } })
  } catch (error) {   
    res.status(400).json({ message: "Erreur lors de la mise à jour" })
  }

  res.status(200).json(updatedType)
}

/**
  * Deletes a type.
  * @example
  * ```js
  * deleteType(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} The deleted type.
  * @throws 404 if the type does not exist or 400 if the type could not be deleted.
  *  
  */

async function deleteType(req, res) {
  const typeId = parseInt(req.params.id)
  const type = await prisma.type.findFirst({ where: { id: typeId } })

  if (!type) res.status(404).json({ message: "Type introuvable" })

  const deletedType = await prisma.type.delete({ where: { id: typeId } })

  if (!deletedType) res.status(400).json({ message: "Erreur lors de la suppression" })

  res.status(200).json(deletedType)
}

module.exports = {
  getAllTypes,
  getType,
  createType,
  updateType,
  deleteType
};
