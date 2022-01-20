var fs = require('fs');

var infile = fs.createReadStream('./output.txt',{flags: 'r'}); //read flag
var outfile = fs.createWriteStream('./output2.txt', {flahs: 'w'}); //write flag

infile.on('data', function(data) { 
    console.log('read data :', data);
    outfile.write(data);
});

infile.on('end', function(){
    console.log('stop reading file');
    outfile.end(function(){
        console.log('stop writing file');
    });
});