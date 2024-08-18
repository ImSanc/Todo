import express, { request, response } from 'express'
import { SignUpSchema, SigninSchema } from './zodSchema.js';
import { User } from './db.js';
import jsonwebtoken from 'jsonwebtoken'
import { jWT_Token } from '../config.js';
import bcrypt from 'bcrypt';

const userRouter = express.Router();

userRouter.post('/signup', async (request,response)=>{

    
    const {username,password,lastName,firstName} = request.body;
    const {success} = SignUpSchema.safeParse({username,password,firstName,lastName});

    if(!success){
        return response.status(400).json({message : "Please enter all the details"}); 
    }

    try{

    const userExist = await User.findOne({username});
    if(userExist){
        return response.status(400).json({message : 'User Already exists'}); 
    }

    const newUser = await User.create({username,password,lastName,firstName});
    const token = jsonwebtoken.sign({username},jWT_Token);

    return response.status(200).json({
        message : "User created Successfully",
        token : token
    })
    }
    catch(err){
        return response.status(500).json({message : 'Something went wrong'})
    }

})

userRouter.post("/signin", async (request,response)=>{

    const {username,password} = request.body;

    const {success} = SigninSchema.safeParse({username,password});
    
    if(!success){
        return response.status(400).json({message : "Please enter correct details"});
    }

    try{
        const userExist = await User.findOne({username});

        if(!userExist){
            return response.status(401).json({message : "User doesn't exist"});
        }

        const storedHashedPassword = userExist.password;
        const match = await bcrypt.compare(password,storedHashedPassword);

        if(match){
            const token = jsonwebtoken.sign({username},jWT_Token);

            response.status(200).json({
                message : "User logged in",
                token : token
            })
        }
        else{
            return response.status(401).json({message : "Enter the correct password"});
        }
    }
    catch(error){
        return response.status(500).json({
            message : 'Something went wrong',
            error : error
        })
    }


})

export default userRouter;