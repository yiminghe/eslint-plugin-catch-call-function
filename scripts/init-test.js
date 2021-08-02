const fs = require('fs-extra');
const path = require('path');

fs.copySync(path.join(__dirname,'../lib'), path.join(__dirname,'../tests/fixture/node_modules/eslint-plugin-catch-call-function'));

