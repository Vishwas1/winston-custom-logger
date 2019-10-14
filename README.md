# Custom Logger

## Install

```
npm i 
npm run build
```

## NPM publish

```
npm login
npm version major | minor | patch
npm publish
```

**Usage**

```js
const { Logger } = require('winston-custom-logger')

const logger = Logger.create(
        'service', // name of service who wants to print the log
        'info' // error | info | warn
        '/tmp/logs/' // directory to store logs
        ); 

logger.info('message to be logged')
logger.warn('message to be logged')
logger.error('message to be logged')
```

**Features**

* Custom directory to store logs.
* Logs will be printed based on timestamp.
* Only those logs will be printed whose log level (`info | error | warn`) is set in `create` method.
* Timestamped log file names (e.g `service1_1571036231604_.log`)


For testing please do `npm run test`

