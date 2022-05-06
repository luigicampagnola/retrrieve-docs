const { listEnvelopes } = require("../models/list.model");

async function getListEnvelopes(req, res) {
  const data = await listEnvelopes()
    .then((result) => result)
    .catch((err) => {
      console.log("error receiving");
    });
  //console.log(data);
  res.json(data);
}

module.exports = {
  getListEnvelopes,
};
