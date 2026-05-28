const fs = require('fs/promises');
const assert = require('node:assert/strict');

// Lower bounds, well below the current dataset sizes (cities ~169k,
// admin1 ~3.8k, admin2 ~47k as of 2026-05). A truncated/empty download
// would fall below these and fail loudly instead of publishing a broken
// dataset to npm.
const MIN_COUNTS = {
  'cities.json': 100000,
  'admin1.json': 2500,
  'admin2.json': 30000,
};

const REQUIRED_FIELDS = {
  'cities.json': ['name', 'lat', 'lng', 'country', 'admin1', 'admin2'],
  'admin1.json': ['code', 'name'],
  'admin2.json': ['code', 'name'],
};

const inRange = (value, min, max) => {
  // Strict numeric parsing: Number() rejects trailing junk that parseFloat
  // would silently truncate (e.g. "45.7N" → 45.7), which would defeat the
  // column-misalignment check this function exists to catch.
  if (typeof value !== 'string' || value.trim() === '') return false;
  const n = Number(value);
  return Number.isFinite(n) && n >= min && n <= max;
};

const validateEntry = (jsonFilename, entry, idx) => {
  for (const key of REQUIRED_FIELDS[jsonFilename]) {
    assert.ok(
      entry && typeof entry === 'object' && key in entry,
      `${jsonFilename}[${idx}] missing required field "${key}"`
    );
  }
  if (jsonFilename === 'cities.json') {
    assert.ok(
      inRange(entry.lat, -90, 90),
      `${jsonFilename}[${idx}] has invalid lat "${entry.lat}" — suggests column misalignment in convert.js`
    );
    assert.ok(
      inRange(entry.lng, -180, 180),
      `${jsonFilename}[${idx}] has invalid lng "${entry.lng}" — suggests column misalignment in convert.js`
    );
  }
};

const loadAndValidate = async (jsonFilename) => {
  const jsonString = await fs.readFile(jsonFilename, { encoding: 'utf8' });
  const parsed = JSON.parse(jsonString);

  assert.ok(Array.isArray(parsed), `${jsonFilename} must be an array`);
  assert.ok(
    parsed.length >= MIN_COUNTS[jsonFilename],
    `${jsonFilename} has only ${parsed.length} entries (min ${MIN_COUNTS[jsonFilename]}) — dataset likely truncated`
  );

  // Sample first, middle, and last entry — catches schema drift or
  // column misalignment that only affects part of the dataset.
  const sampleIndices = [0, Math.floor(parsed.length / 2), parsed.length - 1];
  for (const idx of sampleIndices) {
    validateEntry(jsonFilename, parsed[idx], idx);
  }

  return parsed;
};

const spotCheck = (array, predicate, label) => {
  const entry = array.find(predicate);
  assert.ok(entry, `Spot-check failed: ${label} not found in dataset`);
};

(async () => {
  const [cities, admin1, admin2] = await Promise.all([
    loadAndValidate('cities.json'),
    loadAndValidate('admin1.json'),
    loadAndValidate('admin2.json'),
  ]);

  spotCheck(cities, (c) => c.name === 'Tokyo' && c.country === 'JP', 'Tokyo (JP)');
  spotCheck(cities, (c) => c.name === 'Lyon' && c.country === 'FR', 'Lyon (FR)');
  spotCheck(cities, (c) => c.name === 'Sydney' && c.country === 'AU', 'Sydney (AU)');

  spotCheck(admin1, (a) => a.code === 'US.MA' && a.name === 'Massachusetts', 'US.MA → Massachusetts');
  spotCheck(admin2, (a) => a.code === 'US.MA.025' && a.name === 'Suffolk County', 'US.MA.025 → Suffolk County');

  console.log(
    `OK: cities=${cities.length} admin1=${admin1.length} admin2=${admin2.length}`
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
