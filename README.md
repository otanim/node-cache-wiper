# node-cache-wiper

## Description
**node-cache-wiper** is a cache wiper of the required modules in Node.js.

## How to install

```sh
$ npm install https://github.com/otanim/node-cache-wiper --save
```

### Usage

```javascript
var cacheWiper = require('node-cache-wiper');
var serverPath = './src/server';
var server = require(serverPath); //content of the "server" file now was cached

cacheWiper(serverPath); //cache of the 'server" file now was wiped
server = require(serverPath); //content of the "server" file now was AGAIN cached
```


##License
node-cache-wiper is [licensed under MIT](https://github.com/otanim/node-cache-wiper/blob/master/LICENSE).
