const express = require('express');
const router = express.Router();
const {
  getAllTypes,
  getType,
  createType,
  updateType,
  deleteType
} = require("../controllers/typesController");

router.get("/", getAllTypes);
router.post("/", createType);
router.get("/:id", getType);
router.put("/:id", updateType);
router.delete("/:id", deleteType);

module.exports = router;
