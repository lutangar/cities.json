# Cities of the World
[![Creative Commons License](https://i.creativecommons.org/l/by/3.0/80x15.png)](https://creativecommons.org/licenses/by/3.0/)

These cities comes from GeoNames Gazetteer:
http://www.geonames.org

Here is the description of the original dataset:
> all cities with a population > 1000 or seats of adm div (ca 150.000) [...]

## Install
```
npm install --save cities.json
```

## Usage
Either on **node** or the **browser** (with `webpack`) it get as simple as this:

**ES5**
```
const cities = require('cities.json');
```

**ES6**
```
import cities from 'cities.json';
```

> Since webpack >= v2.0.0, importing of JSON files will work by default.

## Description
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

## Licence

This work is licensed under a [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/).
