const docusign = require("docusign-esign");

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

  return results = await envelopesApi.getDocument(
    accountId,
    envelopeId,
    "combined", //combined or archived
    {}
  );
}

module.exports = {
  retrieveModel,
};
