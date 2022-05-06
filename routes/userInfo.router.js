const express = require("express");
const { getUserInfoController } = require("../controllers/userInfo.controller");
const getUserInfoRouter = express.Router();

getUserInfoRouter.get("/", getUserInfoController);

module.exports = getUserInfoRouter;
