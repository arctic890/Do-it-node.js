const express = require('express')
const http = require('http')

var app = express()

app.use(function(req,res,next){
    console.log('deal with first middleware')
    req.user = '빅터'
    //next()

    //res.send({name: "Henry", country: "France"})

    res.redirect('http://google.co.kr')
})
/**
app.use(function(req,res,next){
    console.log('deal with second middleware')

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
    res.end('<h1>'+req.user+ '... 이제 이해하겠어?</h1>')
})
*/
http.createServer(app).listen(3000, function(){
    console.log("Express server start from port 3000")
})