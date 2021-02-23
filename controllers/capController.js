const capgen = require("capgen");
const util = require("util");
const { builder, create, fragment } = require("xmlbuilder2");
// var parser = require('xml2js');
const { JSDOM } = require("jsdom");
const path = require("path");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
const mockfema = require('../classes/MockFemaCap');
// const fsReadFileAsync= util.promisify(fs.readFile);

function getTextFromFile(filePath) {
  let fileData;
  try {
    fileData = fs.readFileSync(filePath);
    //  console.log(fileData.toString());
    return fileData.toString();
  } catch (err) {
    throw err;
  }
}

async function jsonToCap(req, res) {
  const body = req.body;
  let config, shouldBePosted;
  if (body.hasOwnProperty("config") && body.config !== null) {
    config = body.config;
  } else {
    config = {
      strictMode: false,
      comment: false,
      blah: 1,
      xmlOptions: {
        headless: true,
        prettyPrint: true,
      },
    };
  }

  const gen = new capgen.Capgen(config);

  if (body.hasOwnProperty("post") && body.post !== null) {
    shouldBePosted = body.post;
  } else {
    shouldBePosted = false;
  }
  const xml = gen.createUsing(req.body.payload);

  if (shouldBePosted) {
    if (typeof xml === "object") {
      console.log("Invalid xml!");
    } else {
      const capfeedfilepath = path.join(__dirname, "../public", "capfeed.cap");
      console.log(capfeedfilepath);

      let capxmlFromFile = await getTextFromFile(capfeedfilepath);

      const alerts = create(capxmlFromFile);
      const alert = fragment(xml);
      alerts.node.firstChild.appendChild(alert.node);

      await writeFileAsync(capfeedfilepath, alerts.toString(), "UTF8");
      console.log(alerts.toString());
    }
  }
  res.send(xml);
}

//new code
const femagen = new mockfema.MockFemaCapgen(config);
const f

module.exports = {
  jsonToCap,
};
