const docusign = require("docusign-esign");
const user = require("../data/data");

// R E T R I E V E  M O D E L
async function retrieveModel(
  accessToken,
  basePath,
  accountId,
  documentId,
  envelopeId
) {
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(basePath);
  dsApiClient.addDefaultHeader("Authorization", "Bearer " + accessToken);

  let envelopesApi = new docusign.EnvelopesApi(dsApiClient),
    results = null;

  return (results = await envelopesApi.getDocument(
    accountId,
    envelopeId,
    documentId, //combined or archived
    {}
  ));
  console.log(results);
  /*    const modelDoc = envelopeDocuments.map((files)=>{
    return files.documentId;
  }) */
  //console.log(documentId)
  //console.log("model log", modelDoc);
  /*   let docItem = envelopeDocuments.find(
    
      (item) => {
        console.log(item.documentId)
        console.log(documentId)
        item.documentId === documentId
      }
    ),
    docName = docItem.name,
    hasPDFsuffix = docName.substr(docName.length - 4).toUpperCase() === ".PDF";
    
  pdfFile = hasPDFsuffix;
  if (
    (docItem.type === "content" || docItem.type === "summary") &&
    !hasPDFsuffix
  ) {
    docName += ".pdf";
    pdfFile = true;
  }

  if (docItem.type === "zip") {
    docName += ".zip";
  }
  console.log("docItem", docItem.type)

  //console.log(pdfFile)
  let mimetype;
  if (pdfFile) {
    mimetype = "application/pdf";
  } else if (docItem.type === "zip") {
    mimetype = "application/zip";
  } else {
    mimetype = "application/octet-stream";
  }
  return {
    mimetype: mimetype,
    docName: docName,
    fileBytes: results,
  };  */
}



// R E T R I E V E  O N E  M O D E L
async function retrieveOneModel(accountId, envelopeId) {
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(user.basePath);
  dsApiClient.addDefaultHeader("Authorization", "Bearer " + user.accessToken);

  let envelopesApi = new docusign.EnvelopesApi(dsApiClient),
    results = null;

    console.log(accountId)
    console.log(envelopeId)
  return results = await envelopesApi.getDocument(
    accountId,
    envelopeId,
    "combined", //combined or archived
    {}
  );
}
module.exports = {
  retrieveModel,
  retrieveOneModel,
};
