const docusign = require("docusign-esign");
const user = require("../data/data");



async function listEnvelopes() {
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(user.basePath);
  dsApiClient.addDefaultHeader(
    "Authorization",
    "Bearer " +
      user.accessToken
  );

  let envelopesApi = new docusign.EnvelopesApi(dsApiClient);
  let results = await envelopesApi.listDocuments(
    user.accountId,
    user.envelopeId,
    null
  );

  return results;
}

module.exports = {
  listEnvelopes,
};
