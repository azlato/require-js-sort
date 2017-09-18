# require-js-sort package for Atom editor

Simple Atom tool for sorting your "require" and "import x from" by file path.

Example:
This ...
```javascript
const {color} = require('banana.js');
import {color} from 'apple.js';
```

... will be converted to ...
```javascript
import {color} from 'apple.js';
const {color} = require('banana.js');
```

![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)
