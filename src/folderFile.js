const fs = require("fs");
const folderName = "/Users/luigi.campagnola/documents/retrieve-docs/downloads/";
const path = require("path");

function createFolder() {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  } else {
    console.log("couldn't create a new folder");
  }
  fs.appendFile(`${folderName}/data.txt`, "Hey", (err) => {
    if (err) throw err;
    console.log("File modified and/or created!");
  });
  let baseDir = path.join(__dirname);
  console.log(baseDir);
}



module.exports = { createFolder };
