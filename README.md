# Logger tool for [linguacode-api](https://github.com/LinguaCode/linguacode-api).

## Install

```sh
$ npm install https://github.com/LinguaCode/linguacode-logger --save
```


## Usage

```javascript
var logger = require('linguacode-logger');

logger(1);
logger(2);
logger(3);
logger(4);
logger(3);
logger(2);
logger(1);

logger(1);
logger(2);
logger(1);
```

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
LinguaCode is [licensed under GPLv3](https://github.com/LinguaCode/linguacode-logger/blob/master/LICENSE.txt).