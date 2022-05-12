const user = require("../data/data");
const { retrieveModel } = require("../models/retrieve.model");
const { listEnvelopes } = require("../models/list.model");
const { getUserInfoModel } = require("../models/userInfo.model");
const { createFolder } = require("../src/folderFile");
const { retrieveOneModel } = require("../models/retrieve.model");
const { listOneEnvelopes } = require("../models/list.model");
const { getFolderModel } = require("../models/folder.model");

const { Readable } = require("stream");
const fs = require("fs");
const events = require("events");

const eventEmitter = new events.EventEmitter();



// <-----------------------------------------------------------> //
// ######### R E S U L T  O N E  H A N D L E R

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
    documentId: "archive",
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
    createFolder();
  } else {
    console.log("error on create folder");
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

  const args = {
    accessToken: user.accessToken,
    basePath: user.basePath,
    accountId: accountId,
    documentId: "archive",
    envelopeId: envelopeId,
    envelopeDocuments: envelopeDocuments,
  };

  const results = await retrieveOneModel(accountId, envelopeId).catch((err) =>
    console.log("error results retrieveOne")
  );

  if (results) {
    createFolder();
  } else {
    console.log("error on createFolder() retrieveController");
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
// ######### R E S U L T  H A N D L E R

async function resultsHandler() {
  const envelopeIdPromise = await getEnvelopeId().catch((error) =>
    console.log("error on envelopeIdPromise resultsHandler")
    );
    let count = 1;
  const dataResult = await Promise.all(
    envelopeIdPromise.map(async (envelope, i) => {
      let data = await retrieveController().catch((err) => {
        console.log("error getting results in resultHandler let data");
      });
      
      console.log("Here")
      let buff = Buffer.from(data[i], "binary");

      let readable = new Readable();
      readable._read = () => {};
      readable.push(buff, "binary");
      readable.push(null);


      //console.log(documentName);
      let fileName = `/Users/luigi.campagnola/documents/retrieve-docs/retrrieve-docs/downloads/test-${count++}.pdf`;
      let writable = fs.createWriteStream(fileName);
      
      console.log("<----------------------------->")
      readable.pipe(writable);
    })
  );
  return dataResult;
}

eventEmitter.on("results", resultsHandler);
eventEmitter.emit("results")

module.exports = {
  retrieveController,
  retrieveOneController,
  getEnvelopeId,
};
