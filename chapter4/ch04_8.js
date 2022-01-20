var fs = require('fs');

//open file
fs.open('./output.txt','r',function(err,fd){
    if(err) throw err;

    var buf = Buffer.alloc(10);
    console.log('buffer type : %s', Buffer.isBuffer(buf));

    //read file
    fs.read(fd, buf, 0, buf.length, null,function(err, bytesRead, buffer){
        if(err) throw err;
        var inStr = buffer.toString('utf8',0,bytesRead);
        console.log(inStr);
        console.log(err, bytesRead, buffer);
            
        //close file
        fs.close(fd, function(){
            console.log('read output.txt');
        });
    });
});