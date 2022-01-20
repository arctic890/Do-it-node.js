function add(a,b,callback){
    var result=a+b;
    callback(result);

    var history = function(){
        return a+'+'+b+'='+result;
    };
    return history;
};
//callback/=history
var add_history = add(10,10,function(result){
    console.log('add(10,10) result : %d', result);
});
console.log('add_history result : ' + add_history());

/**
 * add(10,10) result : 20  <- add_history(callback)
 * add_history result : 10+10=20 <- add_history return historoy
 */