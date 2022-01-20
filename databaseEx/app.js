const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const static = require('serve-static')
const expressErrorHandler = require('express-error-handler')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const config = require('./config/key');

const app = express()
const router = express.Router()
const errorHandler = expressErrorHandler({
    static: {
        '404': './views/404.html'
    }
})
//connect to DB
const mongoose = require('mongoose');
const { mongoURl } = require('./config/dev');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true //에러 줄이기
}).then(() => console.log('MongoDB Connected...') ) //연결된거 확인
  .catch(err => console.log(err))
const database = mongoose.connection

//users schema
Userschema = mongoose.Schema({
    userId: String,
    name: String,
    password: String
})

Usermodel = mongoose.model("users",Userschema)


//setting
app.set('port',process.env.PORT || 3000)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(static(path.join(__dirname, 'views')))
app.use(cookieParser())
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}))

app.use('/',router)

////function
var authUser = function(database, id,password,callback){
    console.log("authUser")
    Usermodel.find({"userId":id, "password":password},function(err,results){
        if(err){
            callback(err,null)
            return
        }
        console.dir(results)

       if (results = []){
           console.log("cannot find user")
           callback(null,null)
       } else {
           console.log('find user id [%s], password [%s]',id, password)
           callback(null, results)
       }
    })
}

var register = function(database,id,password,name,callback){
    var user = new Usermodel({"userId":id,"password":password, "name":name})
    user.save(function(err){
        if(err){
            callback(err,null)
            return
        }
        console.log("register success")
        callback(null,user)
    })
}

////routing
router.route('/process/login').post(function(req,res){
    console.log("login")
    var paramId = req.body.id||req.query.id
    var paramPassword = req.body.password||req.query.password 

    if(database){
        authUser(database, paramId, paramPassword, function(err, docs){
            if(err) {throw err}
    
            if(docs){
                console.dir(docs)
                var username=docs[0].name
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
                res.write('<h1>Login success</h1>')
                res.write('<h3>Id : '+ paramId +'</h3>')
                res.write('<h3>UserName : '+ username +'</h3>')
                res.write("<br><br><a href='/login.html'>Login again</a>")
                res.end()
            } else {
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
                res.write('<h1>Login fail</h1>')
                res.write('<h3>Check Id and Password again</h3>')
                res.write("<br><br><a href='/login.html'>Login again</a>")
                res.end()
            }
        })
    
    } else {
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
        res.write('<h1>Fail to connect database</h1>')
        res.end()
    }
})

router.route('/process/register').post(function(req,res){
    console.log("register")
    var paramId = req.body.id||req.query.id
    var paramPassword = req.body.password||req.query.password 
    var paramName = req.body.name||req.query.name

    if(database){
        register(database, paramId, paramPassword, paramName, function(err, results){
            if(err) {throw err}
    
            if(results){
                console.dir(results)
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
                res.write('<h1>Register Success</h1>')
                res.end()
            }else{
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
                res.write('<h1>Fail to Register</h1>')
                res.end()
            }
        })
    
    } else {
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
        res.write('<h1>Fail to connect database</h1>')
        res.end()
    }
})


app.use(expressErrorHandler.httpError(404))
app.use(errorHandler)

http.createServer(app).listen(3000, function(){
    console.log("Express server start from port 3000")
})