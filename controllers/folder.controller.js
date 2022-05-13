const { getFolderModel } = require("../models/folder.model");

async function getFolderController(req, res) {
  const data = await getFolderModel().catch((error) => console.log(error));
  res.send(data);
}

module.exports = {
  getFolderController,
};
