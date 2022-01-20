//객체에 속성으로 함수할당하기
//case1
var Person = {};
Person.age = 20;
Person.name = 'Alice'
Person.add = function(a,b){
    return a+b;
};
console.log('result : %d', Person.add(20,20));

//case2
var Person2 = {};
Person2.age = 20;
Person2.name = 'Ben'
var oper = function(a,b){
    return a+b;
};
Person2.add = oper;
console.log('result :', Person2.add(30,30));

//case3
var Person3 = {
    age: 20,
    name: 'Jeremy',
    add: function(a,b){
        return a+b;
    }
};
console.log('result :', Person3.add(10,10));
