const express = require('express');
const router = express.Router();
const {
  getAllConfigs,
  getConfig,
  createConfig,
  updateConfig,
  deleteConfig
} = require("../controllers/configsController");

const auth = require("../middlewares/auth");

router.get("/", getAllConfigs);
router.get("/:id", getConfig);
router.post("/", auth, createConfig);
router.put("/:id", auth, updateConfig);
router.delete("/:id", auth, deleteConfig);

module.exports = router;
