# Logger tool for [linguacode-api](https://github.com/LinguaCode/linguacode-api).

## Install

```sh
$ npm install https://github.com/LinguaCode/linguacode-lloger --save
```


## Usage

### Code
```javascript
var lloger = require('linguacode-lloger');

lloger(1);
lloger(2);
lloger(3);
lloger(4);
lloger(3);
lloger(2);
lloger(1);

console.llog(1);
console.llog(2);
console.llog(1);
```

### Result
```
1
    2
        3
            4
        3
    2
1
1
    2
1
```

##License
LinguaCode is [licensed under GPLv3](https://github.com/LinguaCode/linguacode-lloger/blob/master/LICENSE.txt).