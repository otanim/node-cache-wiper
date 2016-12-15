# node-cache-wiper

## Description
**node-cache-wiper** is a cache wiper of the required modules in Node.js.  
It's useful when you making tests and there is a need refresh caches.


## How to install

```sh
$ npm install https://github.com/otanim/node-cache-wiper --save
```

### Usage

```javascript
const cacheWiper = require('node-cache-wiper');

const serverPath = './src/server';
let server = require(serverPath);   //content of the "server" file now was cached

cacheWiper(serverPath);             //cache of the "server" file now was wiped

server = require(serverPath);       //content of the "server" file now was cached AGAIN
```


##License
node-cache-wiper is [licensed under MIT](https://github.com/otanim/node-cache-wiper/blob/master/LICENSE).
