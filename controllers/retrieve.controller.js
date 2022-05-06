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
  //res.send(envelopeIds)
  return envelopeIds;
}




async function retrieveMultipleController(req, res) {
  const envelopeIds = await getEnvelopeId().catch((error) =>
    console.log("error")
  );
  console.log(envelopeIds)
  for(let i = 0; i < envelopeIds.length; i++){
    console.log("This")
  }
}

function logThis(){
  console.log("This")
}





async function retrieveController(req, res) {
  //console.log(args.envelopeId)
  //console.log(args.envelopeDocuments)
  // if there are no more envelopeIds
  // return undefinded
  // else
  // processFunction()
  const listModelArray = [];
  const getListModel = await listEnvelopes().catch((error) => "error");
  listModelArray.push(getListModel);
  //console.log(listModelArray);

  const envelopeId = listModelArray.map((envelopeArray) => {
    const id = envelopeArray.envelopeId;
    return id;
  });
  //console.log(envelopeId);

  const envelopeDocuments = listModelArray.map((envelope, i) => {
    const envelopeDocus = envelope.envelopeDocuments;
    return envelopeDocus;
  });

  const accountId = await getUserInfoModel().catch((error) =>
    console.log(error)
  );

  //console.log(accountId);

  //console.log(envelopeDocuments[0]);

  const envelopeIds = await getEnvelopeId().catch((error) =>
    console.log(error)
  );
  //console.log(envelopeIds);

  const args = {
    accessToken: user.accessToken,
    basePath: user.basePath,
    accountId: accountId,
    documentId: "archive", //archive
    envelopeId: envelopeId,
    envelopeDocuments: envelopeDocuments,
  };

  const results = await retrieveModel(args).catch((err) =>
    console.log("error")
  );
  if (results) {
    createFolder();
  } else {
    console.log("error");
  }
  /*   if (results) {
    res.writeHead(200, {
      "Content-Type": results.mimetype,
      "Content-disposition": "inline;filename=" + results.docName,
      "Content-Length": results.fileBytes.length,
    });
  }  */
  //console.log(results)
  res.end(results, "binary");
}

module.exports = {
  retrieveController,
  retrieveMultipleController,
};
