const docusign = require("docusign-esign");
const user = require("../data/data");

async function listEnvelopes(accountId, envelopeIds) {
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(user.basePath);
  dsApiClient.addDefaultHeader("Authorization", "Bearer " + user.accessToken);


  let envelopesApi = new docusign.EnvelopesApi(dsApiClient);
  let results = await envelopesApi.listDocuments(
    accountId,
    envelopeIds,
    null
  );

  return results;
}


async function listOneEnvelopes(accountId, envelopeId) {
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(user.basePath);
  dsApiClient.addDefaultHeader("Authorization", "Bearer " + user.accessToken);


  let envelopesApi = new docusign.EnvelopesApi(dsApiClient);
  let results = await envelopesApi.listDocuments(
    accountId,
    envelopeId,
    null
  );

  return results;
}

module.exports = {
  listEnvelopes,
  listOneEnvelopes
};
