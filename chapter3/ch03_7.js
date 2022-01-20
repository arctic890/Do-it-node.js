function Person(name, age){
    this.name = name;
    this.age = age;
}; //constructor

Person.prototype.walk = function(speed) {
    console.log('walk as '+speed+'km/h speed');
}

var person1 = new Person('Jane','23');
var person2 = new Person('James','22');

console.log('bring walk(10) of ' + person1.name);
person1.walk(10);