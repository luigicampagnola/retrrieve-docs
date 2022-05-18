const express = require("express");
const app = express();
const retrieveRouter = require("../routes/retrieve.router");
const writeFileEnvelopeInfoRouter = require("../routes/file-handler.router");
const getEnvelopesInfoRouter = require("../routes/readerHandler-router");
app.use(express.json()); //convert every request to a js object


app.use("/retrieve", retrieveRouter);
app.use("readerHandler", getEnvelopesInfoRouter)
app.use("file-handler", writeFileEnvelopeInfoRouter);

module.exports = app;
