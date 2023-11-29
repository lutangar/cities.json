# :cityscape: Cities of the World [![Creative Commons License](https://i.creativecommons.org/l/by/3.0/80x15.png)](https://creativecommons.org/licenses/by/3.0/)

These cities comes from [GeoNames Gazetteer](http://www.geonames.org).

> See https://www.geonames.org/datasources/ for the list of data sources.

Here is the description of the original dataset:

> _all cities with a population > 1000 or seats of adm div (ca 150.000) [...]_

_Thus, this file is updated **monthly** and new cities are added as world population rises._

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

- `admin1Code`
- `admin2code`
- _etc._

For example `admin1Code` for a **US** city,j would stand for the **state** :

```jsonc
[
  {
    "name": "Boston",
    "lat": "42.35843",
    "lng": "-71.05977",
    "country": "US",
    "admin1": "MA",
    "admin2": "025"
  }
]
```

You may map the `admin1` code to the full **English** name through the [./admin1.json](./admin1.json) file.
Where the `code` is the concatenation of the `country` code and the `admin1` code, for example:

- `US.MA` → **Massachusetts**

For [./admin1.json](./admin2.json) concatenate `country`, `admin1` code and the `admin2` code:

- `US.MA.025` → **Suffolk County**

## Resource

- https://download.geonames.org/export/dump/

## Licence

This work is licensed under a [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/).
