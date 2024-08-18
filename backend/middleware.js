
import jsonwebToken from "jsonwebtoken";

function authenticationMiddleWare(request,response,next){

    const {authorization}  = request.headers;

    if(!authorization){
        response.send(401).json({message : "Not Authorized,Please login and try again"});
    }

    const token = authorization.split(' ')[1];

    if(!token){
        response.send(401).json({message : "Not Authorized,Please login and try again"});
    }

    try{
        const decoded = jsonwebToken.verify(token,jWT_Token);

    }
    catch(err){
        response.send(401).json( {message : "Not Authorized"});
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