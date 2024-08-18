import express, { request, response } from 'express';
import { Todo } from './db.js';
import { addTodoSchema,updateSchema,deleteSchema,getAllTodoSchema } from './zodSchema.js';
import { authenticationMiddleWare } from '../middleware.js';


const todoRouter = express.Router();

todoRouter.post("/addTodo",authenticationMiddleWare, async (request, response)=>{

    const {userId,title,description} = request.body;

    const {success} = addTodoSchema.safeParse({userId,title,description});

    if(!success){
        return response.status(400).json({message : "Please enter mandatory details"});
    }

    try{
        await Todo.create({ userId: userId,title,description});
        return response.status(200).json({message : "Todo created successfully"});
    }
    catch(err){
        return response.status(400).json({message : "Sorry, something is up"});
    }

})

todoRouter.put("/updateTodo",authenticationMiddleWare, async (request, response)=>{

    const { title,description,todoId} = request.body;
    const {success} = updateSchema.safeParse({todoId,title,description});

    if(!success){
        return response.status(400).json({message : "Please enter mandatory details"});
    }

    try{
        const result = await Todo.updateOne( {_id:todoId }, {$set : {title,description} });

        if( result.modifiedCount === 0 ){
            return response.status(404).json({message :"Todo not found or data not modified"});
        }

        return response.status(200).json({message : "Todo updated successfully"});
    }
    catch(err){
        return response.status(400).json({message : "Sorry, something is up"});
    }

})

todoRouter.delete("/deleteTodo",authenticationMiddleWare , async ( request, response)=>{

    const {todoId} = request.body;
    const {success} = deleteSchema.safeParse({todoId});

    if(!success){
       return response.status(400).json({message : "Please enter the correct details"})
    }

    try{
        const result = await Todo.deleteOne({_id : todoId});

        if(result === 0){
            return response.status(400).json({message : "Todo not found/ Coudln't delete the todo"})
        }

        return response.status(200).json({message : "Todo deleted successfully"});
    }
    catch(err){
        return response.status(500).json({message : "Sorry, something is up"});
    }
})

todoRouter.get("/getTodos", authenticationMiddleWare, async (request,response)=>{
    const {userId} = request.body;
    const {success} = getAllTodoSchema.safeParse({userId});

    if(!success){
        return response.status(400).json({message : "Please enter the required details"});
    }

    try {

        const todos = await Todo.find({userId});
        return response.status(200).json({todos :todos});

    }
    catch(err){
        return response.status(400).json({message : "Sorry, Something is up"});
    }
})

todoRouter.delete("/deleteAll",authenticationMiddleWare, async (request,response)=>{
    const {userId} = request.body;
    const {success} = getAllTodoSchema.safeParse({userId});

    if(!success){
        return response.status(400).json({message : "Please enter the required details"});
    }

    try{
        const result = await Todo.deleteMany({userId ,markAsDone : false});
        
        if( result === 0 ){
            return response.status(400).json({message : "Couldn't delete todos/ please login again"})
        }
        return response.status(200).json({message : "All the Todos are deleted"});
    }
    catch(err){
        return response.status(500).json({message : "Sorry ,Something is up"})
    }
})

todoRouter.get("/doneTodos", authenticationMiddleWare ,async ( request,response)=>{
    const {userId} = request.body;
    console.log(userId);
    const {success} = getAllTodoSchema.safeParse({userId});

    if(!success){
        return response.status(400).json({message : "Please enter the required details"});
    }

    try{
        const doneTodos = await Todo.find({userId,markAsDone : true});
        return response.status(200).json({doneTodos : doneTodos});
    }
    catch(err){
        return response.status(500).json({message : "Sorry, something is up"});
    }
})

export default todoRouter;