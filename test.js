const fs = require('fs/promises');
const jsonfile = require('jsonfile');

const assertParseable = async (jsonFilename) => {
  // assert it can parse the file with native json parsing function
  const jsonString = await fs.readFile(jsonFilename, { encoding: 'utf8' });
  JSON.parse(jsonString);

  // assert it can parse the file with the jsonfile library
  jsonfile.readFileSync(jsonFilename);
};

(async () => {
  assertParseable('cities.json');
  assertParseable('admin1.json');
  assertParseable('admin2.json');
})();
