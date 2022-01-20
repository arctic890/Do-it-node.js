const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const static = require('serve-static')
const expressErrorHandler = require('express-error-handler')
const cookieParser = require('cookie-parser')
const { send } = require('process')
const expressSession = require('express-session')

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
app.use(cookieParser())
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}))

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

app.use(expressErrorHandler.httpError(404))
app.use(errorHandler)

http.createServer(app).listen(3000, function(){
    console.log("Express server start from port 3000")
})