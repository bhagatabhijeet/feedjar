const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);

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

async function writeToFile(filePath, data) {
  await writeFileAsync(filePath, data);
}

module.exports = { getTextFromFile, writeToFile };
