# Cities of the World

This cities comes from the public domain database compiled by The Americas Open Geocode (AOG):
http://www.opengeocode.org/download.php#cities

Here is the description of the original dataset:
> This dataset consists of the most comprehensive list of cities, administrative divisions and other populated places in the world. The data is compiled from:

> United States: United States Geological Survey (USGS) Geographic Names Information Services (GNIS).
> Other Countries: National Geospatial Intelligence Agency (NGA) Geographic Name Server (GNS).
> The NGA/GNS database has been maintained by the NGA since 1994 and contains over 7 million geographic features and populated places records on all countries of the world. For non-US, geographic names are provided both in the local language and local script, as well as romanized and/or English forms of the name.
> Many of the non-US entries in the dataset have multiple records, one per language (e.g., English and Spanish) or script (e.g, Arabic and Latin) that the feature (e.g., city) name is specified in. Multiple records for the same feature are identified by the same NGA GNS Unique Feature Identifier (UFI).

This Json version is an array of object of the following shape:
- ISO 3166-1 alpha-2 country code
- name
- Latitude
- Longitude
```
[
  {
    "country": "FR",
    "name": "Lyon",
    "lat": "45.75",
    "lng": "4.583333"
  },
  ...
]
```

> These cities can pretty easily be matched with countries by code using the following dataset:
> https://github.com/annexare/Countries
