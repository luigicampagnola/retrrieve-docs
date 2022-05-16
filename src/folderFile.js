const { getUserNameModel } = require("../models/userInfo.model");

const fs = require("fs");

const path = require("path");

async function createFolderDownload() {
  const folderDownload = path.dirname(__dirname) + "/downloads/";

  const accountName = await getUserNameModel().catch((error) => {
    console.log("error on accountName retrieveContoller");
  });

  //console.log(__dirname)
  const accountNameFolder = folderDownload + accountName;

  //console.log(accountNameFolder);
  if (!fs.existsSync(folderDownload)) {
    fs.mkdirSync(folderDownload);
  }
  if (!fs.existsSync(accountNameFolder)) {
    fs.mkdirSync(accountNameFolder)
  } 
}

module.exports = { createFolderDownload };
