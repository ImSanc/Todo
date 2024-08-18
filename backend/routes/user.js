import express from 'express'
import { SignUpSchema } from './zodSchema.js';
import { User } from './db.js';
import jsonwebtoken from 'jsonwebtoken'
import { jWT_Token } from '../config.js';

const userRouter = express.Router();

userRouter.post('/signup', async (request,response)=>{

    try{

    const {username,password,lastName,firstName} = request.body;
    const result = SignUpSchema.safeParse({username,password,firstName,lastName});

    if(!result.success){
        return response.status(400).json({message : "Please enter all the details"}); 
    }

   
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

export default userRouter;