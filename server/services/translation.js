const fs = require('fs');
const path = require("path");

async function get(code) {
  try {
    const rawData = fs.readFileSync(path.resolve(__dirname, `../../public/translations/${code}.json`));
    const translation = JSON.parse(rawData);

    return translation;
  } catch (err) {
    console.log('err', err);
  }
}

module.exports = {
  get,
}
