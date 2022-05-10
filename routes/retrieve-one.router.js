const express = require("express");
const { retrieveOneController } = require("../controllers/retrieve.controller");

const retrieveOneRouter = express.Router();

retrieveOneRouter.get("/", retrieveOneController);

module.exports = retrieveOneRouter;