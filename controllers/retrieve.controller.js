const user = require("../data/data");
const { retrieveModel } = require("../models/retrieve.model");
const { listEnvelopes } = require("../models/list.model");
const { getUserInfoModel } = require("../models/userInfo.model");
const { createFolderDownload, createNameFolder } = require("../src/folderFile");
const { retrieveOneModel } = require("../models/retrieve.model");
const { listOneEnvelopes } = require("../models/list.model");
const { getFolderModel, getRecipientsInfo } = require("../models/folder.model");

const { Readable } = require("stream");
const fs = require("fs");
const events = require("events");

const eventEmitter = new events.EventEmitter();

// <-----------------------------------------------------------> //
// ######### E N V E L O P E  I D

async function getEnvelopeId() {
  const results = await getFolderModel()
    .then((data) => data)
    .catch((error) => console.log("error on promise results getEnvelopeId"));

  const envelopes = results.envelopes;

  const envelopeIds = envelopes.map((envelope) => {
    return envelope.envelopeId;
  });
  return envelopeIds;
}

async function getRecipientsDate() {
  const envelopeIdPromise = await getEnvelopeId().catch((error) =>
    console.log("error on envelopeIdPromise resultsHandler")
  );

  const accountId = await getUserInfoModel().catch((error) =>
    console.log("error on promise accountId retrieveController")
  );

  const listRecipientDates = await Promise.all(
    envelopeIdPromise.map(async (envelope, i) => {
      const recipientDates = await getRecipientsInfo(
        accountId,
        envelopeIdPromise[i]
      ).catch((err) => {
        console.log("error on recipientDates getRecipientsDates");
      });
      return recipientDates;
    })
  );

  const delivereDateTime = listRecipientDates.map((recipient, i) => {
    return recipient.signers[0].deliveredDateTime;
  });


  const formatDateTime = delivereDateTime.map(date =>{
    return date.slice(0, -8)
  })
  //console.log(formatDelivereDateTime);
  return formatDateTime;
}

async function getRecipientsNames() {
  const envelopeIdPromise = await getEnvelopeId().catch((error) =>
    console.log("error on envelopeIdPromise resultsHandler")
  );

  const accountId = await getUserInfoModel().catch((error) =>
    console.log("error on promise accountId retrieveController")
  );

  //const envelopeId = envelopeIdPromise[1]

  const recipientNames = await Promise.all(
    envelopeIdPromise.map(async (envelope, i) => {
      const recipientName = await getRecipientsInfo(
        accountId,
        envelopeIdPromise[i]
      ).catch((error) => {
        console.log("error on recipientEmail getting getRecipientInfo");
      });
      return recipientName;
    })
  );

  // Retrieve One Name
  /*   const recipientEmail = await getRecipientInfo(accountId, envelopeId).catch(err=> console.log(err));

  const recipientName = recipientEmail.signers.map(array =>{
    return array.name
  }) */

  const envelopeId = envelopeIdPromise[0]
  const recNames = await getRecipientsInfo(accountId, envelopeId).catch(err =>{console.log("error on recNames")});



  //console.log(recNames)
  const mappingNames = recipientNames.map((recipient, i) => {
    return recipient.signers[0].name;
  });

  //console.log(mappingNames[0][0].name);
  //console.log(mappingNames);

  //console.log(recipientEmails);
  return mappingNames;
}







// <-----------------------------------------------------------> //
// ######### R E T R I E V E  O N E  C O N T R O L L E R

async function retrieveOneController(req, res) {
  const listModelArray = [];
  const accountId = await getUserInfoModel().catch((error) =>
    console.log("error getting accountId")
  );
  const envelopeIdPromise = await getEnvelopeId().catch((error) =>
    console.log(error)
  );

  const envelopeId = envelopeIdPromise[1];

  const getListOneEnvelopeModel = await listOneEnvelopes(
    accountId,
    envelopeId
  ).catch((error) =>
    console.log("error getListOneEnvelopeModel retrieveOneController")
  );
  listModelArray.push(getListOneEnvelopeModel);

  const envelopeDocuments = listModelArray.map((envelope, i) => {
    const envelopeDocus = envelope;
    return envelopeDocus;
  });

  const envelopeName = envelopeDocuments.map((item, i) => {
    return item.envelopeDocuments[i].name;
  });

  const results = await retrieveOneModel(accountId, envelopeId).catch((err) =>
    console.log("error results retrieveOne")
  );

  if (results) {
    createFolder();
  } else {
    console.log("error on createFolder() retrieveOneController");
  }

  //console.log(results)
  return results;
}





// <-----------------------------------------------------------> //
// ######### R E S U L T  O N E  H A N D L E R

async function resultsOneHandler() {
  const data = await retrieveOneController().catch((err) => {
    console.log("error getting results in resultHandler const data");
  });

  const buff = Buffer.from(data, "binary");
  const str = Buffer.from(buff).toString();

  const readable = new Readable();
  readable._read = () => {};
  readable.push(buff, "binary");
  readable.push(null);

  const accountId = await getUserInfoModel().catch((error) =>
    console.log("error getting accountId")
  );
  const envelopeIdPromise = await getEnvelopeId().catch((error) =>
    console.log("error on envelopeIdPromise resultsHandler")
  );

  const envelopeId = envelopeIdPromise[1];

  const getListOneEnvelopeModel = await listOneEnvelopes(
    accountId,
    envelopeId
  ).catch((error) =>
    console.log("error getListOneEnvelopeModel retrieveOneController")
  );

  const documentName = [getListOneEnvelopeModel].map((doc, i) => {
    return doc.envelopeDocuments[i].name;
  });

  //console.log(documentName);
  const fileName = `/Users/luigi.campagnola/documents/retrieve-docs/retrrieve-docs/downloads/${documentName[0]}.pdf`;
  let writable = fs.createWriteStream(fileName);

  readable.pipe(writable);
}














// <-----------------------------------------------------------> //
// ######### R E T R I E V E  C O N T R O L L E R

async function retrieveController(req, res) {
  const accountId = await getUserInfoModel().catch((error) =>
    console.log("error on promise accountId retrieveController")
  );
  const envelopeIds = await getEnvelopeId().catch((error) =>
    console.log("error on promise envelopeIds retrieveController")
  );

  const listDocuments = await Promise.all(
    envelopeIds.map(async (envelope, i) => {
      const getListModel = await listEnvelopes(accountId, envelopeIds[i]).catch(
        (error) => {
          console.log("error on promise listEnvelopes retrieveController");
        }
      );
      return getListModel.envelopeDocuments;
    })
  );

  const args = {
    accessToken: user.accessToken,
    basePath: user.basePath,
    accountId: accountId,
    documentId: "combined",
    envelopeId: envelopeIds,
    envelopeDocuments: listDocuments,
  };

  const downloadResults = await Promise.all(
    envelopeIds.map(async (envelope, i) => {
      const results = await retrieveModel(
        args.accessToken,
        args.basePath,
        args.accountId,
        args.documentId,
        args.envelopeId[i],
        args.envelopeDocuments[i]
      ).catch((error) => {
        console.log("failed to downloadResults retrieveController");
      });
      return results;
    })
  );

  if (downloadResults) {
    //console.log(retrieveNames[0]);
    createFolderDownload();
  } else {
    console.log("error on createfolder retrieveController");
  }

  /*  if (downloadResults[0]) {
    res.writeHead(200, {
      "Content-Type": downloadResults[0].mimetype,
      "Content-disposition": "inline;filename=" + downloadResults[0].docName,
      "Content-Length": downloadResults[0].fileBytes.length,
    });
  }   */

  //console.log(downloadResults[1])
  return downloadResults;
}


// <-----------------------------------------------------------> //
// ######### R E S U L T  H A N D L E R

async function resultsHandler() {
  const retrieveNames = await getRecipientsNames().catch((err) => {
    console.log("error retrieveNames on retrieveController");
  });

  const names = retrieveNames;

  //console.log(names)
  //createNameFolder(names);
  const retrieveDates = await getRecipientsDate().catch(err=>{
    console.log("error oon retrieveDates resultsHandler");
  })

  const dates = retrieveDates;

  console.log(dates)

  const envelopeIdPromise = await getEnvelopeId().catch((error) =>
    console.log("error on envelopeIdPromise resultsHandler")
  );
  let count = 1;
  const dataResult = await Promise.all(
    envelopeIdPromise.map(async (envelope, i) => {
      let data = await retrieveController().catch((err) => {
        console.log("error getting results in resultHandler let data");
      });

      let buff = Buffer.from(data[i], "binary");

      let readable = new Readable();
      readable._read = () => {};
      readable.push(buff, "binary");
      readable.push(null);

      //console.log(documentName);
      let fileName = `/Users/luigi.campagnola/documents/retrieve-docs/retrrieve-docs/downloads/${names[i]}-${dates[i]}.pdf`;
      let writable = fs.createWriteStream(fileName);

      console.log("<----------------------------->");
      readable.pipe(writable);
    })
  );
  return dataResult;
}

eventEmitter.on("results", resultsHandler);
eventEmitter.emit("results");

//eventEmitter.on("name", getRecipientsNames);
//eventEmitter.emit("name");

//eventEmitter.on("date", getRecipientsDate);
//eventEmitter.emit("date");

module.exports = {
  retrieveController,
  retrieveOneController,
  getEnvelopeId,
}
