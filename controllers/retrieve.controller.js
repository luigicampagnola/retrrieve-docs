const { retrieveModel } = require("../models/retrieve.model");
const user = require("../data/data");
const { listEnvelopes } = require("../models/list.model");
const { getUserInfoModel } = require("../models/userInfo.model");
const { createFolder } = require("../src/folderFile");

const { getFolderModel } = require("../models/folder.model");

async function getEnvelopeId() {
  const results = await getFolderModel()
    .then((data) => data)
    .catch((error) => console.log(error));

  const envelopes = results.envelopes;

  const envelopeIds = envelopes.map((envelope) => {
    return envelope.envelopeId;
  });
  //console.log(envelopeIds);
  return envelopeIds;
}

async function retrieveMultipleController(req, res) {
  const envelopeIds = await getEnvelopeId().catch((error) =>
    console.log("error")
  );
  console.log(envelopeIds);
  for (let i = 0; i < envelopeIds.length; i++) {
    console.log(envelopeIds);
  }
}

// ######### R E T R I E V E  C O N T R O L L E R

async function retrieveController(req, res) {
  const accountId = await getUserInfoModel().catch((error) =>
    console.log(error)
  );
  const envelopeIds = await getEnvelopeId().catch((error) =>
    console.log(error)
  );

  /*   const listModelArray = []; */

  //OLD DOCUS ENDPOING
  /*   const getListModel = await listEnvelopes(accountId, envelopeIds).catch(
    (error) => "error"
  ); */
  //console.log(getListModel)
  /*   listModelArray.push(getListModel); */
  //console.log(listModelArray);

  const listDocuments = await Promise.all(
    envelopeIds.map(async (envelope, i) => {
      const getListModel = await listEnvelopes(accountId, envelopeIds[i]).catch(
        (error) => "error getting List"
      );
      return getListModel.envelopeDocuments;
    })
  );

  //console.log(listDocuments);

  /*   const envelopeId = listModelArray.map((envelopeArray) => {
    const id = envelopeArray.envelopeId;
    return id;
  }); */

  /*   const envelopeDocuments = listModelArray.map((envelope, i) => {
    const envelopeDocus = envelope.envelopeDocuments;
    return envelopeDocus;
  }); */

  const args = {
    accessToken: user.accessToken,
    basePath: user.basePath,
    accountId: accountId,
    documentId: "archive", //archive
    envelopeId: envelopeIds, //envelopeIds
    envelopeDocuments: listDocuments, //envelopeDocuments
  };
  
  const downloadResults = await Promise.all(
    envelopeIds.map(async (envelope, i) => {
      const results = await retrieveModel(
        args.accessToken,
        args.basePath,
        args.accountId,
        args.documentId,
        args.envelopeId[i],
        args.envelopeDocuments[i],
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
  /*   if (results) {
    res.writeHead(200, {
      "Content-Type": results.mimetype,
      "Content-disposition": "inline;filename=" + results.docName,
      "Content-Length": results.fileBytes.length,
    });
  }  */
  //console.log(results)
  //console.log(downloadResults)
  res.end(downloadResults[0], "binary");
}

module.exports = {
  retrieveController,
  retrieveMultipleController,
  getEnvelopeId,
};
