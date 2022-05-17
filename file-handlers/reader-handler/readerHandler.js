const { readEnvelopesInfo, readAccountInfo } = require("../readWriteAPI");

const events = require("events");

const eventEmitter = new events.EventEmitter();

async function getEnvelopesInfo() {
  const data = await readEnvelopesInfo().catch((err) =>
    console.log("err on getSendersUsernames")
  );

  //console.log(data);
  const envelopes = data.envelopes;
  //console.log(envelopes);

  

  const senderUserNames = envelopes.map((envelope) => {
    return envelope.sender.userName;
  });

  const envelopeId = envelopes.map((envelope)=>{
      return envelope.envelopeId
  })

  const envelopeDate = envelopes.map((envelope)=>{
      return envelope.sentDateTime
  })
  
  const emailSubject = envelopes.map((envelope)=>{
      return envelope.emailSubject;
    })
/*     
    console.log(senderUserNames);
    console.log(envelopeId)
    console.log(envelopeDate)
    console.log(emailSubject) */
}



async function getNameAndAccountId (){
  const data = await readAccountInfo().catch(erro => console.log("error on readAccountInfo getNameAndAccountId"));

  const accountName = data.accountName;
  const accountId = data.accountIdGuid;

/*   console.log(accountId)
  console.log(accountName); */
}



//eventEmitter.on("create", getEnvelopesInfo);
//eventEmitter.emit("create");

module.exports = {
    getEnvelopesInfo,
}




