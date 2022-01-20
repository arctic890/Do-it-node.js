var http = require('http');

var server = http.createServer(function(req, res){
    console.log('there is clients request');
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("    <head>");
    res.write("        <title>Response page</title>");
    res.write("    </head>");
    res.write("    <body>");
    res.write("        <h1>빗나가던 너의 입술 깨지않던 너의 흐린 꿈</h1>");
    res.write("    </body>");
    res.write("</html>");
    res.end();
});

var port = 3000;
server.listen(port, function(){
    console.log('start web server :', port);
});

server.on('connection',function(socket){
    var addr = socket.address();
    //console.log('clients connect : %s, %d', addr.address, addr.port);
});

server.on('close', function(){
    console.log('close server')
});
