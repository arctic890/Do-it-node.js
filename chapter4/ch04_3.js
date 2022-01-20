process.on('tick',function(count){
    console.log('tick event occur : %d', count);
});

setTimeout(function(){
    console.log('try to emit tick event after 2 sec');

    process.emit('tick',2);
}, 2000);
