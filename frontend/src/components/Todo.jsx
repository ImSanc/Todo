import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from "recoil"
import { errorMessageAtom, showErrorDialogAtom, todosAtom } from "../recoil/atoms"
import { useEffect } from "react";
import axios from "axios";
import { getTodosSelector } from "../recoil/selector";
import { NoTodo } from "./NoTodo";

export function Todo(){

    const todosSelector = useRecoilValueLoadable(getTodosSelector);
    const [todos,setTodos] = useRecoilState(todosAtom);
    const [showErrorDialog,setShowErrorDialog] = useRecoilState(showErrorDialogAtom);
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageAtom);
    const refreshAuthorization = useRecoilRefresher_UNSTABLE(getTodosSelector);

    useEffect ( ()=>{
        
        const todoList = todosSelector?.contents?.todos;
        if( todosSelector.state === "hasValue" && todoList){
            setTodos(todoList);
        }
    },[todosSelector.contents,todosSelector.state,todos])

    return (
        <div className="bg-slate-100 rounded-b-xl">
            { todos.length >0 ?  todos.map( (todo,index) => {
                const lastIndex = index=== todos.length-1;
                const token = localStorage.getItem("token");
                const id = todo._id;

                const completeTodo = async ()=>{
                    try{
                        const response = await axios.delete(`http://localhost:3000/api/v1/todos/deleteTodo?todoId=${id}`,
                            {
                                headers : {
                                'Authorization' : token
                                }
                            }
                        );
                        refreshAuthorization();
                        // if(response.data.deleted){
                            
                        // }
                    }
                    catch(error){
                        
                    }
                }

                return (
                    <div key = {todo._id} className= {`p-2 flex items-center justify-between ${ lastIndex? "" : "border-b-2"} overflow-hidden`}>
                        <div className="font-medium text-sm text-slate-600">
                            <div className="flex items-center  text-xl font-brush-script">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                </svg>
                                <div className=" ml-2 font-semibold ">
                                    { todo.title.charAt(0).toUpperCase() + todo.title.slice(1,todo.length) }
                                </div>
                              
                            </div>
                            <div className="ml-1 text-blue-500 font-brush-script">
                                {todo.description.length>50 ? todo.description.slice(0,40)+"..." : todo.description }
                            </div>
                        </div>
                        <div className=" border-2 border-slate-400 rounded-full p-1 flex items-center justify-center" >
                            <div className="bg-slate-300 rounded-full w-5 h-5 hover:bg-green-500" onClick={completeTodo}>
                            </div>
                        </div>
                    </div>
                )
            }) 
            : <NoTodo/>}

        </div>
    )
}