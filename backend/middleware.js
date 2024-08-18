
import jsonwebToken from "jsonwebtoken";
import { jWT_Token } from "./config.js";
function authenticationMiddleWare(request,response,next){

    const {authorization}  = request.headers;

    if(!authorization){
       return response.status(401).json({message : "Not Authorized,Please login and try again"});
    }

    const token = authorization.split(' ')[1];

    if(!token){
       return response.status(401).json({message : "Not Authorized,Please login and try again"});
    }

    try{
        const decoded = jsonwebToken.verify(token,jWT_Token);

        if(!(decoded.username && decoded.userId)){
            return response.status(401).json({message : "Not Authorized,Please login and try again"});
        }

        request.body.username = decoded.username; 
        request.body.userId = decoded.userId;
        next();
    }
    catch(err){
       return response.status(401).json( {message : "Not Authorized"});
    }

}

function errorHandlingMiddleWare(error,request,response,next){
    if(error instanceof SyntaxError && error.status === 400 && 'body' in error){
        return response.status(400).json({
            message : "Invalid Json payload",
            error : error.message,
        });
    }

    next();
}

export {authenticationMiddleWare,errorHandlingMiddleWare};