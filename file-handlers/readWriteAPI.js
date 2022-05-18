const { getFolderModel } = require("../models/folder.model");

const fs = require("fs");
const events = require("events");
const path = require("path");
const { getUserInfoModel } = require("../models/userInfo.model");



const eventEmitter = new events.EventEmitter();

const folderPath = path.dirname(__dirname) + "/data/";



const userInfoFile = path.join(folderPath, "userInfo.json");

const accountInfoFile = path.join(folderPath, "accountInfo.json")

// <-------------------------- W R I T E  I N F O  J S O N  F I L E S --------------------------------->

async function writeFileEnvelopesInfo() {
  const accountInfo = await readAccountInfo().catch(erro =>{
    console.log("error accountInfo writeFileEnvelopesInfo")
  })

  const accountId = accountInfo.accountIdGuid
  const results = await getFolderModel(accountId).catch((error) =>
    console.log("error on createFileEnvelopeId")
  );
  if (results) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }


  let writer = fs.createWriteStream(folderPath + "userInfo.json");

  writer.write(JSON.stringify(results, null, 2));



  return "Success";
}



async function writeAccountInfo(){
  const results = await getUserInfoModel().catch(err => console.log("err on getUserInfo writeAccountInfo"))
  
  if(results) {
    if(!fs.existsSync(folderPath)){
      fs.mkdirSync(folderPath);
    }
  }
  
  let writer = fs.createWriteStream(folderPath + "accountInfo.json");
  writer.write(JSON.stringify(accountInfo, null, 2))
  
  return "Success"
}




// <-------------------------- R E A D  I N F O  J S O N  F I L E S --------------------------------->

async function readAccountInfo (){
  let reader = fs.createReadStream(accountInfoFile);

  return new Promise((resolve, reject)=>{
    reader.on("data", function(chunk){
      //console.log(JSON.parse(chunk))
      return resolve(JSON.parse(chunk));
    })
  })

}

async function readEnvelopesInfo() {

  let reader = fs.createReadStream(userInfoFile);

  return new Promise((resolve, reject) => {
    reader.on("data", function (chunk) {
      return resolve(JSON.parse(chunk));
    });
  });
}

//eventEmitter.on("write", writeAccountInfo);
//eventEmitter.on("readAccountInfo", readAccountInfo);

//eventEmitter.emit("readAccountInfo");



module.exports = {
  writeFileEnvelopesInfo,
  readEnvelopesInfo,
  readAccountInfo
};
