var http = require('http');
var fs = require('fs');

var server = http.createServer();

var port = 3000;
server.listen(port, function(){
    console.log('start web server :', port);
});

server.on('connection',function(socket){
    var addr = socket.address();
    //console.log('clients connect : %s, %d', addr.address, addr.port);
});

server.on('request', function(req, res){
    console.log('clients request');
    var fileName = 'nbhd1.gif'
    fs.readFile(fileName, function(err,data){
        res.writeHead(200, {"Content-Type": "image/gif"});
        res.write(data);
        res.end();
    });
});

server.on('close', function(){
    console.log('close server')
});

