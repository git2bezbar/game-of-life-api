const express = require('express');
const router = express.Router();
const {
  getAllConfigs,
  getConfig,
  createConfig,
  updateConfig,
  deleteConfig
} = require("../controllers/configsController");

router.get("/", getAllConfigs);
router.post("/", createConfig);
router.get("/:id", getConfig);
router.put("/:id", updateConfig);
router.delete("/:id", deleteConfig);

module.exports = router;
