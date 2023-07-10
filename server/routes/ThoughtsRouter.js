const express = require("express");
const ThoughtsRouter = express.Router();

const { createThoughts } = require("../controllers/ThoughtsControllers.js");

ThoughtsRouter.post("/create", createThoughts);

module.exports = ThoughtsRouter;
