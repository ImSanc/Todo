import mongoose from "mongoose";
import { databaseConnection } from "../config";

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

