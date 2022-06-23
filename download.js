const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const yauzl = require('yauzl');

const txtFilename = 'cities1000.txt';
const zipFilename = 'cities1000.zip';
const zipFile = fs.createWriteStream(zipFilename);
const request = http.get(
  `https://download.geonames.org/export/dump/${zipFilename}`,
  (response) => {
    response.pipe(zipFile);

    zipFile.on('finish', () => {
      zipFile.close();
      console.log('Download Completed');

      yauzl.open(zipFilename, { lazyEntries: true }, (err, zipfile) => {
        if (err) throw err;
        zipfile.readEntry();
        zipfile.on('entry', (entry) => {
          if (entry.fileName === txtFilename) {
            const txtFile = fs.createWriteStream(entry.fileName);
            zipfile.openReadStream(entry, (err, readStream) => {
              if (err) {
                throw err;
              }
              readStream.on('end', function () {
                zipfile.readEntry();
              });
              readStream.pipe(txtFile);
            });
          }
        });
      });
    });
  }
);
