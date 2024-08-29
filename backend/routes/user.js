import express, { request, response } from 'express'
import { SignUpSchema, SigninSchema, passwordSchema, userUpdateSchema } from './zodSchema.js';
import { User } from './db.js';
import jsonwebtoken from 'jsonwebtoken'
import { jWT_Token } from '../config.js';
import bcrypt from 'bcrypt';
import { authenticationMiddleWare } from '../middleware.js';

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
    const userId = newUser._id;
    const token = jsonwebtoken.sign( {username, userId},jWT_Token);

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
        const userId = userExist._id;
        const storedHashedPassword = userExist.password;
        const match = await bcrypt.compare(password,storedHashedPassword);

        if(match){
            const token = jsonwebtoken.sign({username, userId},jWT_Token);

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

userRouter.put("/update", authenticationMiddleWare, async (request,response)=>{

    const {username,password,firstName,lastName} = request.body;

    const {success} = userUpdateSchema.safeParse({firstName,lastName});
    if(!success){
        return response.status(400).json({message : "First Name should be correct / Not empty"});
    }

    if(password){
        const {success} = passwordSchema.safeParse(password);
        if(!success){
            return response.status(400).json({message : "Password should be of 6 or more / Not empty"});
        }
    }

    try{
        const savedUserDetail = await User.findOne({username});
        const match = password ? await bcrypt.compare(password,savedUserDetail.password) : false;
        const firstNameNotUpdate = ifNameNotUpdated(savedUserDetail.firstName,firstName);
        const lastNameNotUpdate = ifNameNotUpdated(savedUserDetail.lastName,lastName);

        if(match && firstNameNotUpdate && lastNameNotUpdate ){
            return response.status(400).json({message : "details are not updated/ Still the same"});
        }

        let result;
        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);

            result = await User.updateOne({username},{$set : { password : hashedPassword,firstName,lastName}});
        }
        else
        {
            result = await User.updateOne({username},{$set : {firstName,lastName}});
        }

        if(result.modifiedCount === 0){
            return response.status(404).json({message :"Please update the data"});s
        }

        return response.status(200).json({
            message :"Updated successfully",
            updated : true
        });

    }
    catch(error){
        return response.status(500).json({message : "Something went wrong"});
    }

})

userRouter.get("/user-exist", authenticationMiddleWare, async (request,response)=>{

    const userId = request.body.userId;
    try{
    const userExist = await User.findById( {_id:userId} );

    if(userExist){
        return response.status(200).json({
            userExist : true,
            user : {
                lastName : userExist.lastName,
                firstName : userExist.firstName
            }
        })
    }
    else{
        return response.status(200).json({
            userExist : false
        })
    }
    }catch(error){
        return response.status(500).json({
            message : "Something went wrong",
            userExist : false
        })
    }
})

function ifNameNotUpdated(savedName,updatedName ){
    return savedName === updatedName;
}

export default userRouter;