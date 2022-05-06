const express = require("express");
const { getFolderController } = require("../controllers/folder.controller");

const getFolderRouter = express.Router();

getFolderRouter.get("/", getFolderController);

module.exports = getFolderRouter;
