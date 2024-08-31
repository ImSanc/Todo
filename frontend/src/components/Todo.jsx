import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { todosAtom } from "../recoil/atoms"
import { useEffect } from "react";
import axios from "axios";
import { getTodosSelector } from "../recoil/selector";

export function Todo(){

    const todosSelector = useRecoilValueLoadable(getTodosSelector);
    const [todos,setTodos] = useRecoilState(todosAtom);

    useEffect ( ()=>{
        
        const todoList = todosSelector?.contents?.todos;
        if( todosSelector.state === "hasValue" && todoList){
            setTodos(todoList);
        }
    },[todosSelector.contents,todosSelector.state,todos])

  


    return (
        <div className="bg-slate-100 rounded-b-xl">
            { todos.map( (todo,index) => {

                const lastIndex = index=== todos.length-1;

                const completeTodo = async ()=>{
                
                }

                return (
                    <div className= {`p-2 flex items-center justify-between ${ lastIndex? "" : "border-b-2"} overflow-hidden`}>
                        <div className="font-medium text-sm text-slate-600">
                            <div className="flex items-center  text-xl font-brush-script">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                </svg>
                                <div className=" ml-2 font-semibold ">
                                    { todo.title.charAt(0).toUpperCase() + todo.title.slice(1,todo.length) }
                                </div>
                              
                            </div>
                            <div className="ml-1 text-blue-500 ">
                                {todo.description.length>50 ? todo.description.slice(0,40)+"..." : todo.description }
                            </div>
                        </div>
                        <div className=" border-2 border-slate-400 rounded-full p-1 flex items-center justify-center ">
                            <div className="bg-slate-300 rounded-full w-5 h-5 hover:bg-green-500">
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}