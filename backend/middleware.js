import { jWT_Token } from "./config";
import jsonwebToken from "jsonwebtoken";

function authenticationMiddleWare(request,response,next){

    const {authorization}  = request.headers;

    if(!authorization){
        response.send(400).json({message : "Not Authorized,Please login and try again"});
    }

    const token = authorization.split(' ')[1];

    if(!token){
        response.send(400).json({message : "Not Authorized,Please login and try again"});
    }

    try{
        const decoded = jsonwebToken.verify(token,jWT_Token);

    }
    catch(err){
        response.send(400).json( {message : "Not Authorized"});
    }

}

export default authenticationMiddleWare;