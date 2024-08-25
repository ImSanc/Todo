
import { TodoHeader } from "../components/TodoHeader";
import { showTodosAtom } from "../recoil/atoms";
import { useRecoilState } from "recoil";

export function TodoListComp(){
    const [showTodos,setShowTodos] = useRecoilState(showTodosAtom);

    const onClickOfTodo = ()=>{
        setShowTodos( (showTodos)=>(!showTodos));
    }

    return (
        <div className ="flex justify-center items-center h-[85%] w-screen" >
                <div className="bg-slate-500 mt-7 w-[90%] h-[95%] rounded-lg flex  justify-center items-center ">
                    <div className="flex flex-col justify-center items-center w-[90%] sm:w-[60%] md:w-[40%]">
                        <div className="w-[90%] sm:w-[60%] md:w-[80%]">
                            <TodoHeader header={"Todo's"} showTodo={showTodos} onClick={onClickOfTodo}/>
                            {
                                showTodos &&
                                    <div className=" rounded-b-sm bg-slate-100">    
                                        san
                                    </div>
                            }
                        </div>
                    </div>
                </div>
        </div>
    )
}