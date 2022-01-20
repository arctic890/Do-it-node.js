var fs = require('fs');

var data = fs.readFileSync('./package.json','utf8');

console.log(data);

//////////
var data2 = fs.readFile('./package.json','utf8', function(err, date){
    console.log(data2);
});

