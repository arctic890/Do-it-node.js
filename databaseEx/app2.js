const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const static = require('serve-static')
const expressErrorHandler = require('express-error-handler')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const crypto = require('crypto')
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

//users2 schema
Userschema = mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    hashedPassword: {type: String, required: true, 'default':' '},
    name: {type: String, index: 'hashed', 'default':' '},
    salt: {type: String, required: true},
    age: {type: Number, 'default': -1},
    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
})
Userschema.static('findById', function(userId, cb){
    return this.find({userId: userId},cb)
})
Userschema.static('findAll', function(cb){
    return this.find({},cb)
})
Userschema.virtual('password')
          .set(function(password){
              this._password = this.password
              this.salt = this.makeSalt()
              this.hashedPassword = this.encryptPassword(password)
              console.log('virtual password: %s', this.hashedPassword)
          })
          .get(function() {return this._password})

Userschema.method('encryptPassword', function(plain, inSalt){
    if(inSalt){
        //sha1-> algorithm  hex-> incoding 
        return crypto.createHmac('sha1',inSalt).update(plain).digest('hex')
    } else {
        return crypto.createHmac('sha1', this.salt).update(plain).digest('hex')
    }
})

Userschema.method('makeSalt',function(){
    return Math.round((new Date().valueOf()*Math.random()))+''
})

Userschema.method('auth',function(plain, inSalt, hashedPassword){
    if(inSalt) {
        console.log('auth: %s -> %s : %s', plain, this.encryptPassword(plain, inSalt), hashedPassword)
        return this.encryptPassword(plain, inSalt) == hashedPassword
    } else {
        console.log('auth :  %s -> %s : %s', plain, this.encryptPassword(plain), hashedPassword)
        return this.encryptPassword(plain) == hashedPassword
    }
})

Userschema.path('userId').validate(function(id) {
    return id.length
}, 'no id column value')

Userschema.path('name').validate(function(name) {
    return name.length
}, 'no name column value')

//Usermodel = mongoose.model("users2",Userschema)
Usermodel = mongoose.model("users3",Userschema)


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

    //1. search by Id
    Usermodel.find({"userId":id, "password":password},function(err,results){
        if(err){
            callback(err,null)
            return
        }
        console.dir(results)

       if (results != []){
           console.log('find user id [%s]',id)
           //2. check password
           var user = new Usermodel({userId:id})
           var authenticated = user.auth(password,results[0]._doc.salt,
                            results[0]._doc.hashedPassword)

           if (authenticated) {
               console.log("Right password")
               callback(null, results)
           } else {
               console.log("wrong password")
               callback(null,null)
           }
       } else {
           console.log("cannot find user")
           callback(null,null)
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
/*
function doTest(){
    var user = new Usermodel({"info": "test1 10k"})

    user.save(function(err){
        if (err) {throw err}
        console.log('doTest - add user data')
        findAll()
    })
    console.log('put value in info')
    console.log('id:%s, name: %s', user.userId, user.name)
}
*/

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

//userList
router.route('/process/userList').post(function(req,res){
    console.log("userList")

    if(database){
        //1. find all users
        Usermodel.findAll(function(err,results){
            if(err){
                console.log("error occur during userList: "+ err.stack)
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
                res.write('<h1>Fail to bring User List</h1>')
                res.write('<p>'+err.stack+'</p>')
                res.end()
                return
            }

            //show lists results[0]._doc.password
            if (results) {
                console.dir(results)
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
                res.write('<h1>User List</h1>')
                res.write('<div><ul>')
                for (i =0; i<results.length; i++){
                    console.log(i)
                    var curId = results[i]._doc.userId
                    var curName = results[i]._doc.name
                    res.write('     <li>#'+i+' : '+curId+', '+curName+'</li>')
                }
                res.write('</ul></div>')
                res.end()
            } else {
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
                res.write('<h1>fail to link database </h1>')
                res.end()
            }
        })
    }
})

app.use(expressErrorHandler.httpError(404))
app.use(errorHandler)

http.createServer(app).listen(3000, function(){
    console.log("Express server start from port 3000")
})