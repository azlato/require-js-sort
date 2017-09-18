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

![GIF example](https://github.com/azlato/require-js-sort/blob/master/example.gif)
