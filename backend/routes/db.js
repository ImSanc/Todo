import mongoose from "mongoose";
import { databaseConnection } from "../config.js";
import bcrypt from "bcrypt"

mongoose.connect(databaseConnection);

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        lowercase :  true,
        minLength : 3,
        maxLength : 50
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minLength : 6,
        maxLength : 50
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastName : {
        type : String,
        trim : true,
        maxLength : 50
    },

})

UserSchema.pre('save', function(next){
    const user = this;

    if(!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10, function(err,salt){

        if(err){
            return next(err);
        }

        bcrypt.hash(user.password,salt, function(err,hash){
            if(err){
                return next(err);
            }

        user.password = hash;
        next();
        })
    })


})

export const User = mongoose.model('User',UserSchema);


