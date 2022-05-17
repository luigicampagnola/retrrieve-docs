const { readAccountInfo } = require("../file-handlers/readWriteAPI")
const fs = require("fs");

const path = require("path");

async function createFolderDownload() {
  const accountInfo = await readAccountInfo().catch((err) =>
    console.log("error accountInfo createFolderDownload")
  );

  const accountName = accountInfo.accountName
  const folderDownload = path.dirname(__dirname) + "/downloads/";


  //console.log(__dirname)
  const accountNameFolder = folderDownload + accountName;

  //console.log(accountNameFolder);
  if (!fs.existsSync(folderDownload)) {
    fs.mkdirSync(folderDownload);
  }
  if (!fs.existsSync(accountNameFolder)) {
    fs.mkdirSync(accountNameFolder);
  }
}

module.exports = { createFolderDownload };
