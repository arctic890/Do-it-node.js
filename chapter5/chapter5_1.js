var http = require('http');

//create server
var server = http.createServer();

//start web server and wait at port 3000
var host = '10.138.73.52';
var port = 3000;
server.listen(port, host, '50000', function(){
    console.log('start web server :', host, port);
});
