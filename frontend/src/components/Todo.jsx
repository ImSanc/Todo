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

                //We can refactor this code to mark as todo if we want to keep the marked todos
                const completeTodo = async ()=>{
                    try{
                        await axios.delete(`http://localhost:3000/api/v1/todos/deleteTodo?todoId=${id}`,
                            {
                                headers : {
                                'Authorization' : token
                                }
                            }
                        );
                        refreshAuthorization();
                    }
                    catch(error){
                        setErrorMessage( error.response?.data?.message || 'An Unexpected error occured');
                        setShowErrorDialog(true);
                        setBackGround('');
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
                        <div className=" relative group border-2 border-slate-400 rounded-full p-1 flex items-center justify-center" >
                            <div className="bg-slate-300 rounded-full w-5 h-5 hover:bg-green-500" onClick={completeTodo}>
                            </div>
                            <span className="absolute right-8 bottom-2 w-20 transform overflow-visible translate-y-1/2 opacity-0 transition-opacity duration-300 text-sm bg-black text-white py-1 px-2 rounded-lg group-hover:opacity-100">
                                Mark as Done
                            </span>
                        </div>
                    </div>
                )
            }) 
            : <NoTodo/>}

        </div>
    )
}