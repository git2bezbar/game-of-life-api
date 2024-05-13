const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const authRoutes = require("./auth");
const typeRoutes = require("./type");

router.use("/", authRoutes);
router.use("/types", typeRoutes);

module.exports = router;