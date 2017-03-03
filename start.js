// Executing this file will cause all js files to be transpiled from ES6

require('babel-register')({
  ignore: /(node_modules)/
});

require('./server.js');
