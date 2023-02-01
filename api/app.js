const path = require("path");
const express = require("express");

const app = express();

const pathToIndex = path.resolve(__dirname, "../client/index.html");

app.use("/*", (req, res) => res.sendFile(pathToIndex));

module.exports = app;
