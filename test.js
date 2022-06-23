const fs = require('fs/promises');
const jsonfile = require('jsonfile');

const jsonFilename = 'cities.json';
(async () => {
  // assert it can parse the file with native json parsing function
  const jsonString = await fs.readFile(jsonFilename, { encoding: 'utf8' });
  JSON.parse(jsonString);

  // assert it can parse the file with the jsonfile library
  jsonfile.readFileSync(jsonFilename);
})();
