const user = require("../data/data");
const { retrieveModel } = require("../models/retrieve.model");

const { createFolderDownload } = require("../src/folderFile");



const { Readable } = require("stream");
const fs = require("fs");
const events = require("events");
const path = require("path");
const { readAccountInfo, readEnvelopesInfo } = require("../file-handlers/readWriteAPI");

const eventEmitter = new events.EventEmitter()




// <-----------------------------------------------------------> //
// ######### R E T R I E V E  C O N T R O L L E R

async function retrieveController(req, res) {

  const accountInfo = await readAccountInfo().catch((error)=>{
    console.log("error on accountInfo retrieveController")
  })

  const accountId = accountInfo.accountIdGuid;

  const envelopesInfo = await readEnvelopesInfo().catch((err)=>{
    console.log("error on envelopesInfo")
  })

  const envelopes = envelopesInfo.envelopes;
  
  const envelopeIds = envelopes.map((envelope)=>{
    return envelope.envelopeId;
  })
  


  const args = {
    accessToken: user.accessToken,
    basePath: user.basePath,
    accountId: accountId,
    documentId: "combined",
    envelopeId: envelopeIds,
  };

  const downloadResults = await Promise.all(
    envelopeIds.map(async (envelope, i) => {
      const results = await retrieveModel(
        args.accessToken,
        args.basePath,
        args.accountId,
        args.documentId,
        args.envelopeId[i],
      ).catch((error) => {
        console.log("failed to downloadResults retrieveController");
      });
      return results;
    })
  );

  if (downloadResults) {
    await createFolderDownload();
  } else {
    console.log("error on createfolder retrieveController");
  }


  return downloadResults;
}



// <-----------------------------------------------------------> //
// ######### R E S U L T  H A N D L E R

async function resultsHandler() {

  const envelopesInfo = await readEnvelopesInfo().catch((err)=>{
    console.log("error on envelopesInfo resultsHandler");
  })

  const accountInfo = await readAccountInfo().catch((erro)=>{
    console.log("error on accountInfo resultsHandler")
  })

  const envelopes = envelopesInfo.envelopes;

  const envelopeDate = envelopes.map((envelope)=>{
    return envelope.deliveredDateTime;
  })

  const formatDateTime = envelopeDate.map((date) => {
    return date.slice(0, -9);
  })

  const envelopeIds = envelopes.map((envelope)=>{
    return envelope.envelopeId;
  })

  const emailSubjects = envelopes.map((envelope)=>{
    return envelope.emailSubject;
  })

  const accountName = accountInfo.accountName;


  const dataResult = await Promise.all(
    envelopeIds.map(async (envelope, i) => {
      let data = await retrieveController().catch((err) => {
        console.log("error getting results in resultHandler let data");
      });

      let buff = Buffer.from(data[i], "binary");

      let readable = new Readable();
      readable._read = () => {};
      readable.push(buff, "binary");
      readable.push(null);

      //console.log(documentName);
      let fileName = `/Users/luigi.campagnola/documents/retrieve-docs/retrrieve-docs/downloads/${accountName}/${emailSubjects[i]}-${formatDateTime[i]}.pdf`;
      let writable = fs.createWriteStream(fileName);

      readable.pipe(writable);
    })
  );
  return dataResult;
}




eventEmitter.on("results", resultsHandler);
eventEmitter.emit("results")

//eventEmitter.on("name", getRecipientsNames);
//eventEmitter.emit("name");

//eventEmitter.on("date", getRecipientsDate);
//eventEmitter.emit("date");

module.exports = {
  retrieveController,
};
