# eslint-plugin-catch-call-function

enforce call specified function or rethrow inside catch clause.

[![NPM version](https://badge.fury.io/js/eslint-plugin-catch-call-function.png)](http://badge.fury.io/js/eslint-plugin-catch-call-function)
[![NPM downloads](http://img.shields.io/npm/dm/eslint-plugin-catch-call-function.svg)](https://npmjs.org/package/eslint-plugin-catch-call-function)
[![Build Status](https://travis-ci.com/yiminghe/eslint-plugin-catch-call-function.svg?branch=main)](https://travis-ci.com/github/yiminghe/eslint-plugin-catch-call-function)

## usage
.eslintrc.js

```js
module.exports = {
  plugins: ['eslint-plugin-catch-call-function'],
  rules:{
    // must call reportError function or re throw
    'catch-call-function/catch-call-function':['error', ['reportError','throw']],
  }
};
```


## rules

correct:

```js
/*eslint catch-call-function/catch-call-function: ["error", ["reportError","throw"]]*/

try {
  console.log(1);
} catch (e) {
  reportError(e);
  // throw e;
}
```

wrong:

```js
/*eslint catch-call-function/catch-call-function: ["error", ["reportError"]]*/

try {
  console.log(1);
} catch (e) {
  console.log(e);
}
```

```
  3:3  error  Must call function inside catch: reportError  catch-call-function/catch-call-function
```