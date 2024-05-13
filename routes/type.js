const express = require('express');
const router = express.Router();
const typeController = require("../controllers/type");

// Get all
router.get("/", typeController.list);

// Create
router.post("/", typeController.create);

// Get one
router.get("/:id", typeController.read);

// Update one
router.put("/:id", typeController.update);


// Delete one
router.delete("/:id", typeController.remove);

module.exports = router;