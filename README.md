# :cityscape: Cities of the World [![CC BY 4.0][cc-by-shield]][cc-by]

These **cities** are coming from the [GeoNames Gazetteer](http://www.geonames.org).

> _all cities with a population > 1000 or seats of adm div down to PPLA3 (ca 130.000) [...]_

_Thus, this file is updated **monthly** and new cities are added as world population rises._

> See https://www.geonames.org/datasources/ for the list of data sources used by **GeoNames**.

## Install

```sh
npm install --save cities.json
```

## Usage

Either on **node** or the **browser** (with `webpack`) it get as simple as this:

**ES5**

```js
const cities = require('cities.json');
```

**ES6**

```js
import cities from 'cities.json';
```

> Since webpack >= v2.0.0, importing of JSON files will work by default.


## Description

This Json version is an array of object of the following shape:

- ISO 3166-1 alpha-2 country code
- name
- Latitude
- Longitude
- Admin code 1: the code of an administrative division (see [Administrative divisions](#administrative-divisions))
- Admin code 2: the code of an administrative subdivision (see [Administrative divisions](#administrative-divisions))

```jsonc
[
  {
    "name": "Lyon",
    "lat": "45.74846",
    "lng": "4.84671",
    "country": "FR",
    "admin1": "84",
    "admin2": "69"
  }
  // etc.
]
```

> These cities can pretty easily be matched with countries by code using the following dataset:
> https://github.com/annexare/Countries

## Administrative divisions

Names and depth of these divisions (and subdivisions) may vary greatly between countries, thus the use of these less expressive property names :

- `admin1` code
- `admin2` code
- _etc._

For example `admin1` code for a **US** city, would stand for the **state** :

```jsonc
[
  {
    "name": "Boston",
    "lat": "42.35843",
    "lng": "-71.05977",
    "country": "US",
    "admin1": "MA", // Massachusetts
    "admin2": "025"
  }
]
```

You may map the `admin1` code to the full **English** name through the [./admin1.json](./admin1.json) file.
Where the `code` is the concatenation of the `country` code and the `admin1` code, for example:

- `US.MA` → **Massachusetts**

For [./admin2.json](./admin2.json) concatenate `country`, `admin1` code and the `admin2` code:

- `US.MA.025` → **Suffolk County**

## Resource

- https://download.geonames.org/export/dump/

## Licence

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg