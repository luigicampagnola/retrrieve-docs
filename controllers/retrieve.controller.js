const { Readable } = require("stream");
const { retrieveModel } = require("../models/retrieve.model");
const user = require("../data/data");
const { listEnvelopes } = require("../models/list.model");
const { getUserInfoModel } = require("../models/userInfo.model");
const { createFolder } = require("../src/folderFile");
const { retrieveOneModel } = require("../models/retrieve.model");
const { listOneEnvelopes } = require("../models/list.model");
const { getFolderModel } = require("../models/folder.model");

const fs = require("fs");
const events = require("events");
const eventEmitter = new events.EventEmitter();

async function getEnvelopeId() {
  const results = await getFolderModel()
    .then((data) => data)
    .catch((error) => console.log(error));

  const envelopes = results.envelopes;

  const envelopeIds = envelopes.map((envelope) => {
    return envelope.envelopeId;
  });
  return envelopeIds;
}

// ######### R E T R I E V E  C O N T R O L L E R

async function retrieveController(req, res) {
  const accountId = await getUserInfoModel().catch((error) =>
    console.log(error)
  );
  const envelopeIds = await getEnvelopeId().catch((error) =>
    console.log(error)
  );

  const listDocuments = await Promise.all(
    envelopeIds.map(async (envelope, i) => {
      const getListModel = await listEnvelopes(accountId, envelopeIds[i]).catch(
        (error) => "error getting List"
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
        console.log("failed to download results");
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
  res.end(downloadResults[0], "binary");
}

// ###### R E T R I E V E  O N E  C O N T R O L L E R
async function retrieveOneController(req, res) {
  const listModelArray = [];
  const accountId = await getUserInfoModel().catch((error) =>
    console.log("error getting accountId")
  );
  const envelopeIdMap = await getEnvelopeId().catch((error) =>
    console.log(error)
  );

  const envelopeId = envelopeIdMap[1];

  const getListModel = await listOneEnvelopes(accountId, envelopeId).catch(
    (error) => console.log("error getListModel")
  );
  listModelArray.push(getListModel);

  const envelopeDocuments = listModelArray.map((envelope, i) => {
    const envelopeDocus = envelope;
    return envelopeDocus;
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
    console.log("error on results retrieve One")
  );

  if (results) {
    createFolder();
  } else {
    console.log("error on create folder");
  }

  return results;
}

async function resultsHandler(req, res) {
  const data = await retrieveOneController().catch((err) => {
    console.log("error getting results in resultHandler const data");
  });
  const buff = Buffer.from(data, "binary");
  console.log(buff);

  const readable = new Readable();
  readable._read = () => {};
  readable.push(buff, "binary");
  readable.push(null);

  console.log(readable);

   let writable = fs.createWriteStream("test.pdf");

  readable.pipe(writable);

  /*
  writer.on("data", function (chunk) {
    buff += chunk;
  });

  writer.on("end", function () {
    console.log(buff);
  }); */

  //console.log(buff.toString())
  //console.log(data);
}

eventEmitter.on("results", resultsHandler);
eventEmitter.emit("results");

module.exports = {
  retrieveController,
  retrieveOneController,
  getEnvelopeId,
};
