var fs = require('fs');

fs.writeFile('./output.txt', 'Hello World!', function(err){
    if (err) {
        console.log('Error :'+ err);
    }

    console.log('write output.txt')
})