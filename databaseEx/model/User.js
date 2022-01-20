const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
//const saltRounds = 10;
//const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
        userId: String,
        name: String,
        password: String
})

userSchema.pre('save',function(next){
    var user = this; //this = userSchema
    //rehash only when password is changed 
    /**
    if(user.isModified('password')){
        //encode password
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next() //return to save
            });
        });
    } else {
        next()
    }*/
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = {User} //다른 파일에서도 쓸 수 있게하기