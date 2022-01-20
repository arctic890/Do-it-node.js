const express = require('express')
const http = require('http')

var app = express()

app.use(function(req,res,next){
    console.log('deal with first middleware')
    
    var userAgent = req.header('User-Agent')
    var paramName = req.query.name
    
    res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'})
    res.write('<h1>Response from Express server</h1>')
    res.write('<div><p>User-Agent:'+userAgent+'</p></div>')
    res.write('<div><p>paramName:'+paramName+'</p></div>')
    res.end()
})

http.createServer(app).listen(3000, function(){
    console.log("Express server start from port 3000")
})