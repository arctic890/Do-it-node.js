//외부모듈 사용
var nconf = require('nconf');
nconf.env();
console.log('os system variable: %s', nconf.get('OS'));