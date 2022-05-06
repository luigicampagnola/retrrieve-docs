const docusign = require("docusign-esign")
const user = require("../data/data");

async function getUserInfoModel() {
    let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(user.basePath);
    dsApiClient.addDefaultHeader("Authorization", "Bearer " + user.accessToken)

    const accountsApi = new docusign.AccountsApi(dsApiClient);
    const account = await accountsApi.getAccountInformation(user.accountId);

;
    const accountId = account.accountIdGuid;
    //console.log(accountId)
    return accountId
}

module.exports = { getUserInfoModel };
