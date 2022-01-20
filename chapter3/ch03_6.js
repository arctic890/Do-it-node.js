function add(a,b,callback){
    var result=a+b;
    callback(result);
    var count = 0;

    var history = function(){
        count ++;
        return count+':'+a+'+'+b+'='+result;
    };
    return history;
};

var add_history = add(10,10,function(result){
    console.log('add(10,10) result : %d', result); // 
});
console.log('add_history result : ' + add_history());
console.log('add_history result : ' + add_history());
console.log('add_history result : ' + add_history());
