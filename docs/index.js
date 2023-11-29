import cities from './cities.geo.json' assert { type: 'json' };

const map = L.map('map').setView([45.74846, 4.84671], 15);

L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png',
  {
    maxZoom: 18,
  }
).addTo(map);

function onEachFeature(feature, layer) {
  const popupContent = `<h2>${feature?.properties?.name}</h2>`;
  layer.bindPopup(popupContent);
}

L.geoJSON([cities], {
  onEachFeature,
  pointToLayer(feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      fillColor: '#ff7800',
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    });
  },
}).addTo(map);
