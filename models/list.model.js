const docusign = require("docusign-esign");
const user = require("../data/data");

async function listEnvelopes(accountId, envelopeIds) {
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(user.basePath);
  dsApiClient.addDefaultHeader("Authorization", "Bearer " + user.accessToken);

  //console.log(accountId);
  //console.log(envelopeIds);

  //console.log(envelopeIds)



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


  //console.log(envelopeId)

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
