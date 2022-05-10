const express = require("express");
const app = express();
const listRouter = require("../routes/list.router");
const retrieveRouter = require("../routes/retrieve.router");
const getFolderRouter = require("../routes/folder.router");
const getEnvelopeIdRouter = require("../routes/envelopeId.router");
const getUserInfoRouter = require("../routes/userInfo.router");
const retrieveOneRouter = require('../routes/retrieve-one.router')
app.use(express.json()); //convert every request to a js object

app.use("/list", listRouter);
app.use("/retrieve", retrieveRouter);
app.use("/folder", getFolderRouter);
app.use("/retrieve-one", retrieveOneRouter)
//app.use("/folderId", getEnvelopeIdRouter);
app.use("/userInfo", getUserInfoRouter);

module.exports = app;
