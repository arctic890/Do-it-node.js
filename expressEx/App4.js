const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const static = require('serve-static')
const expressErrorHandler = require('express-error-handler')

const app = express();
const router = express.Router()
const errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
})


app.set('port',process.env.PORT || 3000)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(static(path.join(__dirname, 'public')))

app.use('/',router)

router.route('/process/login/:name').post(function(req,res){
    console.log("first middleware")
    var paramName = req.params.name
    var paramId = req.body.id||req.query.id
    var paramPassword = req.body.password||req.query.password  //post-get

    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
    res.write('<h3>Name : '+ paramName +'</h3>')
    res.write('<h3>Id : '+ paramId +'</h3>')
    res.write('<h3>Password : '+ paramPassword +'</h3>')
    res.end()
})

app.use(expressErrorHandler.httpError(404))
app.use(errorHandler)

http.createServer(app).listen(3000, function(){
    console.log("Express server start from port 3000")
})