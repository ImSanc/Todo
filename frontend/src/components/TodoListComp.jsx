
import { useEffect, useState } from "react";
import { TodoHeader } from "../components/TodoHeader";
import { showAddTodoAtom, showTodosAtom } from "../recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Todo } from "./Todo";
import { AddTodo } from "./AddTodo";

export function TodoListComp(){
    const [showTodos,setShowTodos] = useRecoilState(showTodosAtom);
    const [showAddTodo,setShowTodoAdd] = useRecoilState(showAddTodoAtom);
    const [isVisible,setIsVisible] = useState(false);


    const onClickOfTodo = ()=>{
        setShowTodoAdd(false);
        const timeout = setTimeout( ()=>{  setShowTodos( !showTodos);},400);
        return ()=>clearTimeout(timeout);
    }

    useEffect( ()=>{
        if(showTodos){
            setIsVisible(true);
        }
        else
        {
            const timeout = setTimeout( ()=>{ setIsVisible(false)},400);
            return ()=>clearTimeout(timeout);
        }
    },[showTodos]);



    return (
        <div className ="flex justify-center items-center h-[85%] w-screen" >
                <div className="bg-slate-500 mt-7 w-[90%] h-[95%] rounded-lg flex  justify-center items-center ">
                    <div className="flex flex-col justify-center items-center w-[90%] sm:w-[90%] md:w-[50%]">
                        <div className="w-[90%] sm:w-[80%] md:w-[80%]">
                            <TodoHeader header={"Todo's"} showTodo={showTodos || showAddTodo } onClick={onClickOfTodo}/>
                            <div className = {`transition-all duration-1000 ease-in-out overflow-hidden 
                                 ${ (showTodos || showAddTodo) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>

                                {
                                    isVisible &&
                                        <Todo/>
                                }
                                {
                                    showAddTodo && <AddTodo/>
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
        </div>
    )
}