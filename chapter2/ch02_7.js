//내부모듈

var os = require('os');
console.log('hostname : %s', os.hostname());
console.log('system memory : %d / %d', os.totalmem(), os.freemem());
console.log('cpu : \n');
console.dir(os.cpus());
console.log('network interface : ');
console.dir(os.networkInterfaces());