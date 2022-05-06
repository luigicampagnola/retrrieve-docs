const docusign = require("docusign-esign");
const user  = require("../data/data");
const moment = require("moment");

async function getFolderModel(args) {
  let dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(user.basePath);
  dsApiClient.addDefaultHeader("Authorization", "Bearer " + user.accessToken);

  let envelopesApi = new docusign.EnvelopesApi(dsApiClient),
    results = null;

  let options = { fromDate: moment().subtract(30, "days").format() };

  results = await envelopesApi.listStatusChanges(user.accountId, options)
  return results;
}

module.exports = {
  getFolderModel,
};
