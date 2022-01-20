process.on('exit',function(){
    console.log('exit event occur');
});

setTimeout(function(){
    console.log('try to exit program after 2sec');

    process.exit();
},2000);