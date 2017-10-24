Orchejs REST
==================

[![npm version](https://badge.fury.io/js/%40orchejs%2Frest.svg)](https://badge.fury.io/js/%40orchejs%2Frest)
[![Build Status](https://travis-ci.org/orchejs/rest.svg?branch=master)](https://travis-ci.org/orchejs/rest)
[![Coverage Status](https://coveralls.io/repos/github/orchejs/rest/badge.svg?branch=master)](https://coveralls.io/github/orchejs/rest?branch=master)

Create REST APIs in Node.js using Typescript Decorators with lots of utilities that will make your code cleaner and boost your productivity.

-------

- [About Orchejs](#aoj)
- [Orchejs REST](#wor)
- [App Generator](#gen)
- [Quick start](#qks)
  - [Installation](#ins)
  - [Setup](#set)
- [Documentation](#doc)
- [Contributing](#con)
- [Contact](#cot)
- [License](#lic)

-------
## <a name="aoj"></a> About Orchejs

The Orchejs project provides a set of libraries aggregating key technologies and consolidated libraries for the development of APIs in Node.js.

The goal is to make the backend development in Node.js even more productive, organized and that promotes scalability and maintainability.

## <a name="wor"></a> Orchejs REST

Use this library to create your REST APIs in Node.js and take advantage of the following benefits:
- Simple server configuration.
- Type checking from **Typescript**.
- Clean and organized code.
- Decorators (Annotations) to specify your endpoints, query, path params and properties.
- Validators.
- Request and Response generic classes.
- Interceptors to manipulate your requests and hooks.
- API Logging.

## <a name="gen"></a> App Generator

The easiest way to start with orchejs rest is by using the yeoman generator.

First be sure that you have yeoman installed as a global dependency:
```sh
npm install -g yo
```

Then install the generator-orchejs-rest package as global:
```sh
npm install -g generator-orchejs-rest
```

The next step is to create the app using the generator-orchejs-rest package.
```sh

```

## <a name="qks"></a> Quick start

The easiest way to configure your project is by using the [yeoman generator](#gen), however if you
want to configure your on project structure than follow this quickstart.

### <a name="ins"></a> Installation

Installation, **without** CORS support:

With yarn:
```bash
yarn add @orchejs/rest express body-parser 
```

With npm:
```bash
npm install --save @orchejs/rest express body-parser
```

And if you need CORS:

With yarn:
```bash
yarn add cors
```

With npm:
```bash
npm install --save cors
```

### <a name="set"></a> Setup

Enable ```experimentalDecorators``` and ```emitDecoratorMetadata``` compiler options in tsconfig.json.

tsconfig.json example: 
```json
{
  "compilerOptions": {
    "target": "es6",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## <a name="doc"></a> Documentation

// TODO: add documentation

## <a name="con"></a> Contributing

If you want to contribute to the project, please check out the [contributing](CONTRIBUTING.md) 
document.

**Thanks for supporting Orchejs!**

## <a name="cot"></a> Contact

// TODO: add documentation

## <a name="lic"></a> License

MIT License

Copyright (c) 2017 Mauricio Gemelli Vigolo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
