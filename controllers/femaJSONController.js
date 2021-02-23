const { v4: uuidv4 } = require('uuid');

const path = require("path");
const fs = require("fs");
const {getTextFromFile,writeToFile} = require('../util');

function postMockFemaWebDisaster(req, res) {
  try {
    let body = req.body;
    let shouldBePosted;
    if (body.hasOwnProperty("payload") && body.payload !== null) {
      body.payload.autoid=uuidv4();      
    } else {
      res.json({ type: "error", message: "invalid JSON! Could not find 'payload Object'." });
    }

    if (body.hasOwnProperty("post") && body.post !== null) {
      shouldBePosted = body.post;
    } else {
      shouldBePosted = false;
    }
    if(shouldBePosted){
      const femaJSONFilePath = path.join(__dirname, "../public", "mockFemaWebDisasterDeclarations.json")
      const filedata=JSON.parse(getTextFromFile(femaJSONFilePath));
      filedata.FemaWebDisasterDeclarations.push(body.payload);
      writeToFile(femaJSONFilePath,JSON.stringify(filedata));
    }
    
    res.send(req.body.payload);
  } catch (err) {
    res.json({ type: "error", message: err.message });
  }
}

function deleteSingleMockFemaWebDisasterRecord(req, res){
  console.log(req.params);

  const femaJSONFilePath = path.join(__dirname, "../public", "mockFemaWebDisasterDeclarations.json")
  const filedata=JSON.parse(getTextFromFile(femaJSONFilePath));
  const retNode= filedata.FemaWebDisasterDeclarations.filter(a=>a.autoid === req.params.autoid);
 
  filedata.FemaWebDisasterDeclarations=filedata.
  FemaWebDisasterDeclarations.filter(j=>j.autoid !== req.params.autoid)
  writeToFile(femaJSONFilePath,JSON.stringify(filedata));
  res.send(retNode);

}

module.exports = { postMockFemaWebDisaster,deleteSingleMockFemaWebDisasterRecord };
