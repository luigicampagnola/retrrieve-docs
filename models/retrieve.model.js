const docusign = require("docusign-esign");

async function retrieveModel(args) {
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(args.basePath);
  dsApiClient.addDefaultHeader("Authorization", "Bearer " + args.accessToken);

  let envelopesApi = new docusign.EnvelopesApi(dsApiClient),
    results = null;

  return results = await envelopesApi.getDocument(
    args.accountId,
    args.envelopeId,
    args.documentId, //combined or archived
    {}
  );

/*   const modelDoc = args.envelopeDocs.map((files)=>{
    return files.documentId;

    
  })
  console.log(args.documentId)
  console.log("model log", modelDoc);
  let docItem = args.envelopeDocuments.find(
      (item) => item.documentId === args.documentId
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
  console.log(pdfFile)
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
  }; */
}

module.exports = {
  retrieveModel,
};
