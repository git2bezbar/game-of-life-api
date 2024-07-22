const express = require('express');
const router = express.Router();
const {
  getAllTypes,
  getType,
  createType,
  updateType,
  deleteType
} = require("../controllers/typesController");

const auth = require("../middlewares/auth");

router.get("/", getAllTypes);
router.get("/:id", getType);
router.post("/", auth, createType);
router.put("/:id", auth, updateType);
router.delete("/:id", auth, deleteType);

module.exports = router;
