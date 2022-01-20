var Person = {};

Person['age'] = 20;
Person.name = 'Jane';

console.log(Person['name'], Person.age);

var Person2 = {'name' : 'John', 'age' : 20};
//Person2.name = 'John';
Person2.age = 19;

console.log(Person2.name, Person2.age);