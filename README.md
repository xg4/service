# Service

> Wake up mobile qq service

[![Build Status](https://www.travis-ci.com/xg4/service.svg?branch=master)](https://www.travis-ci.com/xg4/service)
[![codecov](https://img.shields.io/codecov/c/github/xg4/service.svg)](https://codecov.io/gh/xg4/service)
[![npm](https://img.shields.io/npm/v/@xg4/service.svg)](https://www.npmjs.com/package/@xg4/service)
[![GitHub](https://img.shields.io/github/license/xg4/service.svg)](https://github.com/xg4/service/blob/master/LICENSE)

## Installation

### Install with npm or Yarn

```bash
# npm
$ npm install @xg4/service --save
```

```bash
# yarn
$ yarn add @xg4/service
```

## Usage

```js
import Service from '@xg4/service'

const service = new Service() // or new Service(userAgent)

const qq = 123456

const url = service.get(qq)

console.log(url)
```

## Contributing

Welcome

- Fork it

- Submit pull request

## LICENSE

MIT
