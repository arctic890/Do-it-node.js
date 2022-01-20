var result = 0;

console.time('duration');

for (var i = 1; i <= 1000; i++){
    result += 1;
}

console.timeEnd('duration');
console.log('sum 1 to 1000 : %d', result);
console.log('current file: %s', __filename);
console.log('current file path: %s', __dirname);

var Person = {name:"Olly", age:20};
console.dir(Person);