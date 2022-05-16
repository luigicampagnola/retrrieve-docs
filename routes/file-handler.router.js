const express = require("express")
const { createFileSenderInfo } = require("../file-handlers/createFileEnvelopeId");

const createFileEnvelopeIdRouter = express.Router();

createFileEnvelopeIdRouter.get("/", createFileSenderInfo);

module.exports = createFileEnvelopeIdRouter;

