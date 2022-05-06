const { getUserInfoModel } = require("../models/userInfo.model");

async function getUserInfoController(req, res) {
  const data = await getUserInfoModel().catch((error) => console.log(error));
  res.send(data);
  return data;
}

module.exports = {
  getUserInfoController,
};
