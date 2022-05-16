const { getFolderModel } = require("../models/folder.model");

const fs = require("fs");
const events = require("events");
const path = require("path");

const eventEmitter = new events.EventEmitter();

async function createFileSenderInfo() {
  const folderPath = path.dirname(__dirname) + "/api-data/";
  const results = await getFolderModel().catch((error) =>
    console.log("error on createFileEnvelopeId")
  );
  if (results) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }
  
  fs.writeFile(
    folderPath + "userInfo.json",
    JSON.stringify(results, null, 2),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        return console.log("File successfully written");
      }
    }
  );

  const userInfoFile = path.join(folderPath + "userInfo.json");


  fs.readFile(userInfoFile, function (err, data) {
    if (err) {
      console.log(err);
    }
    const users = JSON.parse(data);

    const envelopes = users.envelopes;
      //console.log(envelopeIds)
    console.log(envelopes)
    //processFile(envelopes)
      return envelopes
  });

/*   function processFile(content){
      return content;
  }

  console.log(processFill); */

  const envelopes = results.envelopes;

  const sender = results.envelopes[0].sender;

  const envelopeIds = envelopes.map((envelope) => {
    return envelope.envelopeId;
  });

  const envelopeDate = envelopes.map((envelope) => {
    return envelope.sentDateTime;
  });

  const senderAccountId = envelopes.map((envelope) => {
    return envelope.sender.accountId;
  });

  const senderEmail = envelopes.map((envelope) => {
    return envelope.sender.email;
  });

  const senderUserId = envelopes.map((envelope) => {
    return envelope.sender.userId;
  });

  const senderUsername = envelopes.map((envelope) => {
    return envelope.sender.userName;
  });
  return "Success";
}

eventEmitter.on("create", createFileSenderInfo);
eventEmitter.emit("create");

module.exports = {
  createFileSenderInfo,
};
