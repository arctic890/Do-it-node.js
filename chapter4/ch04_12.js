var fs = require('fs');
var http = require('http');
var server = http.createServer(function(req, res){
    var inStream = fs.createReadStream('./output.txt');
    inStream.pipe(res);
});
server.listen(7001, '127.0.0.1');