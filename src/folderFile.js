
const fs = require("fs");
const folder =
  "/Users/luigi.campagnola/documents/retrieve-docs/retrrieve-docs/downloads/";
const path = require("path");

async function createFolderDownload(names) {
/*    const retrieveRecipientNames = await getRecipientsNames().catch((error) =>
    console.log("error retrieveRecipientNames on folderFile")
  );
  let accountName = retrieveRecipientNames[0];  
 */
console.log(names)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  } else {
    console.log("couldn't create a new folder");
  }
/* 
  console.log(test);
 fs.mkdirSync(`${folder}/${accountName}`);  
 */

  /*   fs.appendFile(`${folderName}/data.txt`, "Hey", (err) => {
    if (err) throw err;
    console.log("File modified and/or created!");
  }); */
  /*   let baseDir = path.join(__dirname);
  console.log(baseDir); */
}

function createNameFolder(names){
  if(names){
    console.log(names)
  }
}

module.exports = { createFolderDownload, createNameFolder };
