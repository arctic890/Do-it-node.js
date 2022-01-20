var net = require('net');

var server = net.createServer(function(client){
    console.log('client connected : port:%s, host:%s', client.localAddress, client.localPort);
    client.setTimeout(500);
    client.setEncoding('utf8');

    client.on('data', function(data){
        //클라이언트에서 데이터 받기
        console.log('recieved data from client :', data.toString());
        //클라이언트에게 데이터 보내기
        //client.write('Sending: ' + data.toString());
        client.write('\n'+'Recieved: ' + data.toString());
        client.write('\n'+'Response: ' + 'Good byeeeeeeee');
    });

    client.on('end', function() {
        console.log('Client disconnected');
      });
});

//포트 수신
server.listen(3000, function() {
    console.log('Server listening: ' + JSON.stringify(server.address()));
    server.on('close', function(){
      console.log('Server Terminated');
    });
    server.on('error', function(err){
      console.log('Server Error: ', JSON.stringify(err));
    });
  });