import { useRecoilState } from "recoil"
import { todosAtom } from "../recoil/atoms"
import { useEffect } from "react";

export function Todo(){
    const [todos,setTodos] = useRecoilState(todosAtom);

    useEffect ( ()=>{
        setTodos([
            {title:"Sanchit"},
            {title: "Mishra"},
            {title : "Hello"}
        ])
    },[])

    return (
        <div className="bg-white rounded-b-xl">
            { todos.map( (todo,index) => {

                const lastIndex = index=== todos.length;

                return (
                    <div className="p-2 flex items-center border-b-2 overflow-hidden">
                       { todo.title}
                    </div>
                )
            })}
        </div>
    )
}