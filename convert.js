var fs = require('fs');
var jsonfile  = require('jsonfile');
var readline  = require('readline');

var file = './cities.json';
var cities = [], i = 0, city;

readline.createInterface({
  input: fs.createReadStream('./worldcities.csv'),
  output: process.stdout,
  terminal: false
}).on('line', function(line) {
  city = line.split(',');
  if (i !== 0) {
    // Column 0: ISO 3166-1 alpha-2 country code.
    // Column 1: US FIPS 5-2 1st level administrative division code (e.g., state/province).
    // Column 2: NGA GNS Feature Description (DSG) code.
    // Column 3: NGA GNS Unique Feature Identifier (UFI).
    // Column 4: ISO 639-1 alpha-2/3 code for language corresponding to the feature name.
    // Column 5: Language script (e.g., latin, arabic, chinese, etc) corresponding to the feature name.
    // Column 6: Feature name.
    // Column 7: Latitude coordinate of the area centroid.
    // Column 8: Longitude coordinate of the area centroid.
    cities.push({
      country: city[0],
      name: city[6].replace('"', '').replace('"', ''),
      lat: city[7],
      lng: city[8]
    });
  }
  i++;
}).on('close', function() {
  jsonfile.writeFile(file, cities, {spaces: 2}, function (err) {
    if (err) {
      console.error(err)
    }
  })
});
