function add(a,b,callback) {
    var result = a+b;
    callback(result);
};

add(10,10,function(result){
    console.log('result of add(10,10) :', result);
});

add(20,10,function(result){
    console.log('result of add(20,10) :', result);
});
