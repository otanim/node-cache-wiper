# Logger tool for [linguacode-api](https://github.com/LinguaCode/linguacode-api).

## Description
**linguacode-logger** is a hyper recursive logger tool which helps to create simple charts for a complex hyper recursions.

## Screenshot
![Screenshot](https://raw.githubusercontent.com/LinguaCode/linguacode-logger/master/screenshots/image.png)

## How to install

```sh
$ npm install https://github.com/LinguaCode/linguacode-logger --save
```

### Usage

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


## Example

### Code

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

### Output
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
