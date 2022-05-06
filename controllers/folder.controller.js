const { getFolderModel } = require("../models/folder.model");

async function getFolderController(req, res) {
  const data = await getFolderModel().catch((error) => console.log(error));
  //console.log(data);
  //res.json(data.envelopes);
  //console.log(data.envelopes)  

/*   const envelopes = data.envelopes;
  
  const envelopeIds = envelopes.map((envelope)=>{
    return envelope.envelopeId;
  })

  console.log(envelopeIds); */

  res.send(data)
}

module.exports = {
  getFolderController,
};
