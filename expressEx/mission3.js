//basic express module
const express = require('express')
const http = require('http')
const path = require('path')
//express middleware
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const static = require('serve-static')
//const errorHandler = require('errorhandler')
//error hanlder
const expressErrorHandler = require('express-error-handler')
//session middleware
const expressSession = require('express-session')
//file upload middleware
const multer = require('multer')
const fs = require('fs')
//support cors when client req using ajax
const cors = require('cors')

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
app.use('/src',static(path.join(__dirname, 'src')))
app.use(cookieParser())
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}))
app.use(cors())

var storage = multer.diskStorage({
    destination: function (req,file,callback){
        callback(null,'src')
    },
    filename: function(req,file,callback){
        callback(null, file.originalname + Date.now())
    }
})

var upload = multer({
    storage: storage,
    limits: {
        files:10,
        fileSize: 1024*1024*1024
    }
})

app.use('/',router)

router.route('/process/showCookie').get(function(req,res){
    console.log("call showCookie")
    res.send(req.cookies)  //show cookie on screen
})

router.route('/process/setUserCookie').get(function(req,res){
    console.log("call setUserCookie") //save cookie in client storage
    res.cookie('user',{
        id:'itzy',
        name: 'dalla dalla',
        authorized: 'true'
    })
    res.redirect('/process/showCookie')
})

router.route('/process/login').post(function(req,res){
    console.log("login")
    var paramId = req.body.id||req.query.id
    var paramPassword = req.body.password||req.query.password  //post-get

    if (req.session.user == true) {
        console.log("already logged in")
        console.log(req.session.user)
        //console.log("user logged in, move to product page")
        res.redirect('/product.html')
    } else {
        //save session
        console.log("save session")

        let userS = {id: paramId, name: "Finn", authorized: true}

        req.session.user = userS
        
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
        res.write('<h1>Login success</h1>')
        res.write('<h3>Id : '+ paramId +'</h3>')
        res.write('<h3>Password : '+ paramPassword +'</h3>')
        res.write("<br><br><a href='/process/product'>Product page</a>")
        res.end()
    }

})
router.route('/process/logout').get(function(req,res){
    console.log("call process/logout")
    //check user session
    if (req.session.user) {
        console.log("log out")
        //remove session
        req.session.destroy(function(err){
            if (err) {throw err}
            console.log("delete session and log out")
            res.redirect('/login.html')
        })
    } else {
        console.log('not logged in')
        res.redirect('/login.html')     
    }
})

router.route('/process/product').get(function(req,res){
    console.log("call process/product")
    //check user session
    if (req.session.user) {
        res.redirect('/product.html')    //login -> product
    } else {
        res.redirect('/login.html')      //loginX -> login
    }
})

router.route('/process/image').post(upload.array('image',1),function(req,res){
    console.log("call /process/image")
    try{
        var files = req.files
        console.dir('==========first upload image=============')
        console.dir(req.files[0])
        console.dir('===========')

        //define var which saves current file info
        var originalname='', filename='', mimetype='', size=0

        if (Array.isArray(files)){
            console.log("fileNum in array: %d",files.length)

            for(i= 0; i<files.length; i++){
                originalname = files[i].originalname
                filename = files[i].filename
                mimetype = files[i].mimetype
                size = files[i].size
            } //뭘 위한 루프임???? 배열에서 마지막 정보보여주는건데 
            
        }

        console.log('current file info : '+ originalname + ', '+filename+', '+mimetype+', '+size)

        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
        res.write('<h1>Upload success</h1>')
        res.write('<hr/>')
        res.write('<p>File name: '+ originalname + ' -> ' + filename+'</p>')
        res.write("<p>Mime type:"+mimetype+"</p>")
        res.write("<p>File size:"+size+"</p>")
        res.end()
    } catch(err){
        console.dir(err.stack)
    }
})
//mission3 memo
router.route('/process/memo').post(upload.array('image',1),function(req,res){
    console.log("call /process/memo")
        try{

        var writer = req.body.writer
        var date = req.body.date
        var memo = req.body.memo

        console.log("writer: "+writer)
        console.log("date: "+date)
        console.log("memo: "+memo)

        var files = req.files
        console.dir('==========first upload image=============')
        console.dir(req.files[0])
        console.dir('===========')

        //define var which saves current file info
        var originalname='', filename='', mimetype='', size=0

        if (Array.isArray(files)){
            console.log("fileNum in array: %d",files.length)

            for(i= 0; i<files.length; i++){
                originalname = files[i].originalname
                filename = files[i].filename
                mimetype = files[i].mimetype
                size = files[i].size
            } 
        }
        console.log('current file info : '+ originalname + ', '+filename+', '+mimetype+', '+size)

        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'})
        res.write('<h1>Upload success</h1>')
        res.write('<hr/>')
        res.write('<h3>Saved memo</h3>')
        res.write('<p>writer: '+writer +'</p>')
        res.write('<p>date: '+date+'</p>')
        res.write('<p>memo: '+memo+'</p>')
        res.write('<br>')
        res.write('<h3>Saved Image</h3>')
        res.write('<img src="/src/'+ filename + '" width="200px">')
        res.write('<br>')
        res.write("<a href='/memo.html'>Write</a>")
        res.end()
    } catch(err){
        console.dir(err.stack)
    }
    
})

app.use(expressErrorHandler.httpError(404))
app.use(errorHandler)

http.createServer(app).listen(3000, function(){
    console.log("Express server start from port 3000")
})