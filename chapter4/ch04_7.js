var fs = require('fs');

//open file
fs.open('./output.txt','w',function(err,fd){
    if(err) throw err;

    var buf = Buffer.from('Hello\n');

    //write file
    fs.write(fd, buf, 0, buf.length, null,function(err, written, buffer){
        if(err) throw err;
            console.log(err, written, buffer);
        fs.close(fd, function(){
            console.log('close file');
        });
    });
});