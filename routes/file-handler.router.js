const express = require("express")
const { writeFileEnvelopesInfo } = require("../file-handlers/readWriteAPI");

const writeFileEnvelopeInfoRouter = express.Router();

writeFileEnvelopeInfoRouter.get("/", writeFileEnvelopesInfo);

module.exports = writeFileEnvelopeInfoRouter;

