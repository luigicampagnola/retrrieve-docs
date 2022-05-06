/* const { getFolderModel } = require("../models/folder.model");

async function getEnvelopeIdController(req, res) {
  const results = await getFolderModel()
    .then((data) => data)
    .catch((error) => console.log(error));

  const envelopes = results.envelopes;

  const envelopeIds = envelopes.map((envelope) => {
    return envelope.envelopeId;
  });

  //console.log(envelopeIds);
  //res.send(envelopeIds)
  return envelopeIds;
}

module.exports = {
  getEnvelopeIdController,
}; */
