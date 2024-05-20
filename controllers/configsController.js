const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
  * Provides all the existing configs.
  * @example
  * ```js
  * getAllConfigs(req, res);
  * ```
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {JSON} All the configs.
  */

async function getAllConfigs(req, res) {
  const configs = await prisma.config.findMany()
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
  const config = await prisma.config.findUnique({ where: { id: configId } })

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
  const {
    name,
    bounding_box_x,
    bounding_box_y,
    pixels,
    type,
    period,
    speed,
  } = req.body

  const typeExists = await prisma.type.findUnique({ where: { id: type } })

  if (!typeExists) res.status(404).json({ message: "Le type n'existe pas" })

  const config = await prisma.config.create({ 
    data: { 
      name,
      bounding_box_x,
      bounding_box_y,
      pixels,
      type,
      period,
      speed,
    } })

  if (!config) res.status(400).json({ message: "Erreur lors de la création" })

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
  const configId = parseInt(req.params.id)
  const config = await prisma.config.findUnique({ where: { id: configId } })

  if (!config) res.status(404).json({ message: "La configuration n'existe pas" })

  const typeExists = await prisma.type.findUnique({ where: { id: type } })

  if (!typeExists) res.status(404).json({ message: "Le type n'existe pas" })

  const {
    name,
    bounding_box_x,
    bounding_box_y,
    pixels,
    type,
    period,
    speed,
  } = req.body

  const updatedConfig = await prisma.config.update({ where: { id: configId }, data: { 
    name,
    bounding_box_x,
    bounding_box_y,
    pixels,
    type,
    period,
    speed,
  } })

  if (!updatedConfig) res.status(400).json({ message: "Erreur lors de la mise à jour" })

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
  const config = await prisma.config.findUnique({ where: { id: configId } })

  if (!config) res.status(404).json({ message: "La configuration n'existe pas" })

  const deletedConfig = await prisma.config.delete({ where: { id: configId } })

  if (!deletedConfig) res.status(400).json({ message: "Erreur lors de la suppression" })

  res.status(200).json(config)
}

module.exports = {
  getAllConfigs,
  getConfig,
  createConfig,
  updateConfig,
  deleteConfig,
}
