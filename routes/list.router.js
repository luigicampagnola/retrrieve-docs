
const express = require("express");
const { getListEnvelopes } = require("../controllers/list.controller");

const listRouter = express.Router();

listRouter.get("/", getListEnvelopes);

module.exports = listRouter;