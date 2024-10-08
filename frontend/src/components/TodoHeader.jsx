import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from "recoil"
import { showAddTodoAtom, showTodosAtom, todosAtom } from "../recoil/atoms"
import axios from "axios";
import { getTodosSelector } from "../recoil/selector";

export function TodoHeader({header,showTodo,onClick}){

    const setShowTodoAdd = useSetRecoilState(showAddTodoAtom);
    const setShowTodo = useSetRecoilState(showTodosAtom);
    const todos = useRecoilValue(todosAtom);
    const refreshAuthorization = useRecoilRefresher_UNSTABLE(getTodosSelector);
    const token = localStorage.getItem("token");

    const onAddClick = (e)=>{
        setShowTodo(false);
        setTimeout(()=>{
            setShowTodoAdd(true);
        },700);
       
        e.stopPropagation();
    }

    const deleteAllTodos = async () => {
        (e) => e.stopPropagation();

        try{
            const response = await axios.delete("http://localhost:3000/api/v1/todos/deleteAll",{
                headers :{
                    'Authorization' : token
                }
            });

            if(response.data.deleted)
            {
                refreshAuthorization();
            }
        }
        catch(error)
        {

        }

    }

    return (
        <div className={ `flex justify-between items-center bg-blue-900 ${ showTodo ? "rounded-t-xl" : "rounded-xl"} py-2 px-6 `} onClick={onClick}>
            <div className="font-medium text-4xl p-2 text-slate-300">
                {header}
            </div>
            <div className="flex justify-around items-center" >

                <div  className="flex relative  items-center p-2 group text-slate-300 transform transition-transform duration-300 hover:scale-125 hover:text-green-400 " onClick={(e)=> {onAddClick(e)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        <span className="absolute top-5 w-20 transform translate-y-1/2 opacity-0 transition-opacity duration-300 text-sm bg-black text-white py-1 px-2 rounded-lg group-hover:opacity-100">
                            Add Todo
                        </span>
                </div>

                { todos.length!=0 ?  <div className="flex relative text-slate-300 items-center p-2 group transform transition-transform duration-300 hover:scale-125 hover:text-red-500 " onClick={()=>{deleteAllTodos(); } }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6  hover:cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <span className="absolute top-5 w-20 transform translate-y-1/2 opacity-0 transition-opacity duration-300 text-sm bg-black text-white py-1 px-2 rounded-lg group-hover:opacity-100">
                        Delete All
                    </span>
                </div> 
                : null }
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`text-slate-300 w-8 h-8 font-medium transition-transform duration-1000 ${showTodo ? 'rotate-180' : 'rotate-0'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                 
            </div>
        </div>
    )
}