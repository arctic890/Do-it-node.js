var fs = require('fs');
var inputF = './ex1_list.txt';

var data = fs.readFile(inputF,'utf8', function(err, data){
    var lines = data.split('\n');
    for (i=0; i < lines.length; i++) {
        var words = lines[i].split(' ');
        console.log(words[0]);
    };
});

/**
 * ------ cmd ---------
 * WeyesBlood
 * PeachPit
 * ArcticMonkeys
 * MyBloodyValentine
 */



