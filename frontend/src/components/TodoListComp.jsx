
import { useEffect, useState } from "react";
import { TodoHeader } from "../components/TodoHeader";
import { showTodosAtom } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import { Todo } from "./Todo";

export function TodoListComp(){
    const [showTodos,setShowTodos] = useRecoilState(showTodosAtom);
    const [isVisible,setIsVisible] = useState(false);

    const onClickOfTodo = ()=>{
        setShowTodos( (showTodos)=>(!showTodos));
    }

    useEffect( ()=>{
        if(showTodos){
            setIsVisible(true);
        }
        else
        {
            const timeout = setTimeout( ()=>{ setIsVisible(false)},1000);
            return ()=>clearTimeout(timeout);
        }
    },[showTodos]);



    return (
        <div className ="flex justify-center items-center h-[85%] w-screen" >
                <div className="bg-slate-500 mt-7 w-[90%] h-[95%] rounded-lg flex  justify-center items-center ">
                    <div className="flex flex-col justify-center items-center w-[90%] sm:w-[60%] md:w-[40%]">
                        <div className="w-[90%] sm:w-[60%] md:w-[80%]">
                            <TodoHeader header={"Todo's"} showTodo={showTodos} onClick={onClickOfTodo}/>
                            <div className = {`transition-all duration-1000 ease-in-out overflow-hidden 
                                 ${ showTodos ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>

                                {
                                    isVisible &&
                                        <Todo></Todo>
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
        </div>
    )
}