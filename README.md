# Cities of the World

[![Creative Commons License](https://i.creativecommons.org/l/by/3.0/80x15.png)](https://creativecommons.org/licenses/by/3.0/)

These cities comes from [GeoNames Gazetteer](http://www.geonames.org).

> See https://www.geonames.org/datasources/ for the list of data sources.

Here is the description of the original dataset:

> _all cities with a population > 1000 or seats of adm div (ca 150.000) [...]_

_Thus, this file is updated monthly, new cities are appended to this set, as world population rises..._

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
- Admin code 1 (_names in **English** for administrative division_ see [./admin1Codes.json])
- Admin code 2 (_names in **English** for administrative subdivision_ see [./admin2Codes.json])

```jsonc
[
  {
    "name": "Lyon",
    "lat": "45.74846",
    "lng": "4.84671",
    "country": "FR",
    "admin1_code": "84",
    "admin2_code": "69"
  }
  // etc.
]
```

> These cities can pretty easily be matched with countries by code using the following dataset:
> https://github.com/annexare/Countries

## Administrative divisions and subdivisions

Names and depth of these divisions are very different from country to country thus the use of the keys `admin1Code`, `admin2code`, etc.

For example `admin1Code` for a **US** city,j would stand for the **state** :

```jsonc
[
  {
    "name": "Boston",
    "lat": "42.35843",
    "lng": "-71.05977",
    "country": "US",
    "admin1_code": "MA",
    "admin2_code": "025"
  }
]
```

You may map the `admin1_code` to the full **English** name with [./admin1Codes.json]
where `code` is the concatenation of the `country` and the `admin1_code`, for example :

- `US.MA` → __Massachusetts__

For [./admin2Codes.json] concatenate `country`, `admin1_code` and `admin2_code`,
- `US.MA.025` → __Suffolk County__


admin1CodesASCII.txt : names in English for admin divisions. Columns: code, name, name ascii, geonameid
admin2Codes.txt : names for administrative subdivision 'admin2 code' (UTF8), Format : concatenated codes <tab>name <tab> asciiname <tab> geonameId

## Licence

This work is licensed under a [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/).
