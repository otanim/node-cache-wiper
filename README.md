# Logger tool for [linguacode-api](https://github.com/LinguaCode/linguacode-api).

## Install

```sh
$ npm install https://github.com/LinguaCode/linguacode-logger --save
```

### How to
##### require the **linguacode-logger** module.
```javascript
var logger = require('linguacode-logger');
```

##### prints single `message`.
```javascript
logger.log(message)
```

##### same as `logger.log`.
```javascript
console.logg(message)
```

##### prints single collapse's first `message`.
```javascript
console.logg(message, 'begin')
```

##### prints single collapse's last `message`.
```javascript
console.logg(message, 'end')
```

##### reset the indent level.
```javascript
logger.init()
```


### Example

```javascript
var logger = require('linguacode-logger');

console.llog('single');
console.llog('1st level', 'begin');
console.llog('2nd level', 'begin');
console.llog('3rd level', 'begin');
console.llog('single');
console.llog('3rd level', 'end');
console.llog('2nd level', 'end');
console.llog('1st level', 'end');
console.llog('single');
```

### Result
```
single
1st level
    2nd level
        3rd level
            single
        3rd level
    2nd level
1st level
single
```

##License
LinguaCode is [licensed under GPLv3](https://github.com/LinguaCode/linguacode-lloger/blob/master/LICENSE.txt).
