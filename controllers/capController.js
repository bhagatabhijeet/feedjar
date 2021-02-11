const capgen = require("capgen");
const util = require('util');
const { builder, create, fragment } = require("xmlbuilder2");
// var parser = require('xml2js');
const { JSDOM } = require("jsdom");
const path = require("path");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
// const fsReadFileAsync= util.promisify(fs.readFile);


function getTextFromFile(filePath){
  let fileData;
  try{
   fileData = fs.readFileSync(filePath);
  //  console.log(fileData.toString());
   return fileData.toString();
  }
  catch(err){
    throw err;
  }
  
}

async function jsonToCap(req, res) {
  const config = {
    strictMode: false,
    comment: false,
    xmlOptions: {
      headless: true,
      prettyPrint: true,
    },
  };
  const gen = new capgen.Capgen(config);
  // const jsonObj=req.body
  // console.log(jsonObj);
  const xml = gen.createUsing(req.body);

  const capfeedfilepath = path.join(__dirname, "../public", "capfeed.cap");
  console.log(capfeedfilepath);

  let capxmlFromFile = await getTextFromFile(capfeedfilepath);

    
 
  // **** working ****
  // const dom = new JSDOM("");
  // const DOMParser = dom.window.DOMParser;
  // const parser = new DOMParser;
  // let doc = parser.parseFromString(capxmlFromFile, "application/xml")
  const alerts = create(capxmlFromFile);
  const alert = fragment(xml);
  alerts.node.firstChild.appendChild(alert.node);
   
  await writeFileAsync(capfeedfilepath,alerts.toString(),'UTF8');
  console.log(alerts.toString());
  res.send(xml);
}

module.exports = {
  jsonToCap,
};
