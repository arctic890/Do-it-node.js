var http = require('http');

var server = http.createServer();

var port = 3000;
server.listen(port, function(){
    console.log('start web server :', port);
});

server.on('connection',function(socket){
    var addr = socket.address();
    console.log('clients connect : %s, %d', addr.address, addr.port);
});

server.on('request', function(req, res){
    console.log('clients request');
    console.dir(req);
});

server.on('close', function(){
    console.log('close server')
});

server.on('request', function(req, res){
    console.log('clients request');
    // response
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("    <head>");
    res.write("        <title>Response page</title>");
    res.write("    </head>");
    res.write("    <body>");
    res.write("        <h1>어떤 기억들은 돌아오지도 않고 지나가지도 않고</h1>");
    res.write("    </body>");
    res.write("</html>");
    res.end();
});
