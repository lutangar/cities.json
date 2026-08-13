const cities = require('./cities.json');
const jsonfile = require('jsonfile');

const mapCityToPointFeature = ({ lat, lng, ...properties }) => ({
  type: 'Feature',
  properties,
  geometry: {
    type: 'Point',
    coordinates: [parseFloat(lng), parseFloat(lat)],
  },
});
jsonfile.writeFile(
  './docs/cities.geo.json',
  {
    type: 'FeatureCollection',
    features: cities.map(mapCityToPointFeature),
  },
  { spaces: 2 },
  (e) => {
    if (e) {
      console.error(e);
    }
  }
);
