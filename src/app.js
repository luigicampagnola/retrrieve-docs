const express = require("express");
const app = express();
const listRouter = require("../routes/list.router");
const retrieveRouter = require("../routes/retrieve.router");
const getFolderRouter = require("../routes/folder.router");
const getUserInfoRouter = require("../routes/userInfo.router");
const retrieveOneRouter = require('../routes/retrieve-one.router')
const createFileEnvelopeIdRouter = require("../routes/file-handler.router");
app.use(express.json()); //convert every request to a js object


app.use("/list", listRouter);
app.use("/retrieve", retrieveRouter);
app.use("/folder", getFolderRouter);
app.use("/retrieve-one", retrieveOneRouter)
//app.use("/folderId", getEnvelopeIdRouter);
app.use("/userInfo", getUserInfoRouter);
app.use("file-handler", createFileEnvelopeIdRouter);

module.exports = app;
