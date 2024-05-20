const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const authRoutes = require("./auth");
const typeRoutes = require("./type");
const configRoutes = require("./config");

router.use("/", authRoutes);
router.use("/types", typeRoutes);
router.use("/configs", configRoutes);

module.exports = router;
