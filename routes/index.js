const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const authRoutes = require("./auth");

router.use("/", authRoutes);

module.exports = router;