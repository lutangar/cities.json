const fs = require('fs');
const yauzl = require('yauzl');
const { Readable } = require('stream');
const { pipeline } = require('stream/promises');

const baseURL = 'https://download.geonames.org/export/dump/';

// 2 minutes is the cutoff: cities1000.zip (~9 MB) downloads in seconds
// on any reasonable link, so a longer stall means the server is wedged
// rather than slow.
const REQUEST_TIMEOUT_MS = 120_000;

const download = async (url, destPath) => {
  console.log(`Downloading ${url}`);
  const response = await fetch(url, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`GET ${url} → HTTP ${response.status}`);
  }
  await pipeline(
    Readable.fromWeb(response.body),
    fs.createWriteStream(destPath)
  );
  console.log(`Downloaded: ${destPath}`);
};

const extractFromZip = (zipPath, entryName, destPath) =>
  new Promise((resolve, reject) => {
    yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
      if (err) return reject(err);
      let found = false;
      zipfile.on('entry', (entry) => {
        if (entry.fileName !== entryName) return zipfile.readEntry();
        found = true;
        zipfile.openReadStream(entry, (err, readStream) => {
          if (err) return reject(err);
          pipeline(readStream, fs.createWriteStream(destPath))
            .then(() => {
              console.log(`Extracted: ${destPath}`);
              resolve();
            })
            .catch(reject);
        });
      });
      zipfile.on('end', () => {
        if (!found) {
          reject(new Error(`Entry "${entryName}" not found in ${zipPath}`));
        }
      });
      zipfile.on('error', reject);
      zipfile.readEntry();
    });
  });

(async () => {
  await Promise.all([
    download(`${baseURL}admin1CodesASCII.txt`, 'admin1CodesASCII.txt'),
    download(`${baseURL}admin2Codes.txt`, 'admin2Codes.txt'),
    download(`${baseURL}cities1000.zip`, 'cities1000.zip'),
  ]);
  await extractFromZip('cities1000.zip', 'cities1000.txt', 'cities1000.txt');
  console.log('All downloads complete.');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
