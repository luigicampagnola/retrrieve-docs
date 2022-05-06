const express = require("express");
const { retrieveMultipleController } = require("../controllers/retrieve.controller");

const retrieveMultipleRouter = express.Router();

retrieveMultipleRouter.get("/", retrieveMultipleController);

module.exports = retrieveMultipleRouter;