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
    var infile = fs.createReadStream(fileName, {flag:'r'});
    var fileLength = 0;
    var curLength = 0;

    fs.stat(fileName, function(err, stats) {
        fileLength = stats.size;
    })

    //write header
    res.writeHead(200, {"content-Type": "image/gif"});
    
    //read file from stream and write
    infile.on('readable', function() {
        var chunk;
        // chunk가 null이 될때까지??? chunk = infile.read()
        while (null != (chunk = infile.read())) {
            console.log("read data size : %d", chunk.length);
            curLength += chunk.length;
            res.write(chunk, 'utf8', function(err){
                console.log("complete writing part of file : %d, size of file: %d", curLength, fileLength);
                if (curLength >= fileLength) {
                    //send response
                    res.end();
                }
            });
        }
    });
    

});

server.on('close', function(){
    console.log('close server')
});

