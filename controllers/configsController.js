const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
  * Provides all the existing configs and filter if a type is given in params.
  * @example
  * ```js
  * getAllConfigs(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} All the configs.
  */

async function getAllConfigs(req, res) {
  const typeId = req.query.typeId
  let configs

  if (typeId) {
    configs = await prisma.config.findMany({ where: { typeId: parseInt(typeId) } })
  } else {
    configs = await prisma.config.findMany()
  }

  res.status(200).json(configs)
}

/**
  * Provides information about a specific config.
  * @example
  * ```js
  * getConfig(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} The provided config.
  * @throws 404 if the configId is not defined.
  */

async function getConfig(req, res) {
  const configId = parseInt(req.params.id)
  const config = await prisma.config.findFirst({ where: { id: configId } })

  if (!config) res.status(404).json({ message: "La configuration n'existe pas" })

  res.status(200).json(config)
}

/**
  * Creates a new config.
  * @example
  * ```js
  * createConfig(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} The created config.
  * @throws 400 if the config could not be created.
  */

async function createConfig(req, res) {
  let config
  const {
    name,
    bounding_box_x,
    bounding_box_y,
    pixels,
    typeId,
    period,
    speed,
  } = req.body

  const typeExists = await prisma.type.findFirst({ where: { id: parseInt(typeId) } })

  if (!typeExists) res.status(404).json({ message: "Le type n'existe pas" })

  try {
    console.log(
      name,
      bounding_box_x,
      bounding_box_y,
      pixels,
      typeId,
      period,
      speed,
    )
    config = await prisma.config.create({ 
      data: { 
        name,
        bounding_box_x: parseInt(bounding_box_x),
        bounding_box_y: parseInt(bounding_box_y),
        pixels,
        typeId: parseInt(typeId),
        period: parseInt  (period),
        speed: parseInt(speed),
      } })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Erreur lors de la création" })
  }

  res.status(201).json(config)
}

/**
  * Updates a config.
  * @example
  * ```js
  * updateConfig(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} The updated config.
  * @throws 404 if the config does not exist or 400 if the config could not be updated.
  */

async function updateConfig(req, res) {
  let updatedConfig
  const configId = parseInt(req.params.id)
  const {
    name,
    bounding_box_x,
    bounding_box_y,
    pixels,
    typeId,
    period,
    speed,
  } = req.body
  const config = await prisma.config.findFirst({ where: { id: configId } })

  if (!config) res.status(404).json({ message: "La configuration n'existe pas" })

  const typeExists = await prisma.type.findFirst({ where: { id: config.typeId } })

  if (!typeExists) res.status(404).json({ message: "Le type n'existe pas" })

  try {
    updatedConfig = await prisma.config.update({ where: { id: configId }, data: { 
      name,
      bounding_box_x: parseInt(bounding_box_x),
      bounding_box_y: parseInt(bounding_box_y),
      pixels,
      typeId: parseInt(typeId),
      period: parseInt  (period),
      speed: parseInt(speed),
    } })
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour" })
  }

  res.status(200).json(updatedConfig)
}

/**
  * Deletes a config.
  * @example
  * ```js
  * deleteConfig(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} The deleted config.
  * @throws 404 if the config does not exist.
  */

async function deleteConfig(req, res) {
  const configId = parseInt(req.params.id)
  const config = await prisma.config.findFirst({ where: { id: configId } })

  if (!config) res.status(404).json({ message: "La configuration n'existe pas" })

  const deletedConfig = await prisma.config.delete({ where: { id: configId } })

  if (!deletedConfig) res.status(400).json({ message: "Erreur lors de la suppression" })

  res.status(200).json(deletedConfig)
}

module.exports = {
  getAllConfigs,
  getConfig,
  createConfig,
  updateConfig,
  deleteConfig,
}
