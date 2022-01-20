var fs = require('fs');

var inName = './output.txt'
var outName = './output2.txt'

fs.exists(outName, function(exists){
    if(exists) {
        fs.unlink(outName, function(err){
            if(err) throw err;
            console.log('delete' + outName);
        });
    }
    var infile = fs.createReadStream(inName, {flags: 'r'});
    var outfile = fs.createWriteStream(outName, {flags: 'w'});
    infile.pipe(outfile);
    console.log('copy' + inName + '->' +outName);
});