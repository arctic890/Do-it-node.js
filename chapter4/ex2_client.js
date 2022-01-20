var net = require('net');

var port = 3000;
var host = 'localhost';
var client = new net.Socket();
client.connect(port, host, function(){
    this.setTimeout(500);
    this.setEncoding('utf8');
    console.log('connect to server')
    //서버로 데이터 보내기
    this.write('Helloooooo')
    //서버에서 데이터 받기
    this.on('data', function(data){
        console.log("Read from server: " + data.toString());
        this.end();
    });

    this.on('end', function(){
        console.log('client disconnected');
    });
    this.on('close', function(){
        console.log('Socket closed');
    });
    this.on('error', function(err){
        console.log('Socket error :', JSON.stringify(err));
    });
});