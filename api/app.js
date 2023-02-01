const path = require("path");
const express = require("express");

const app = express();
const router = require("./src/router");

app.use("/", router);


const pathToIndex = path.resolve(__dirname, "../client/index.html");

const pathToStatic = path.resolve(__dirname, "uploads");

app.use(express.static(pathToStatic));
app.use("/*", (req, res) => res.sendFile(pathToIndex));



module.exports = app;
