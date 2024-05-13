require('dotenv').config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const routes = require('./routes');

app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);

const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
  console.log(`Serveur démarré sur http://${hostname}:${port}`);
});
