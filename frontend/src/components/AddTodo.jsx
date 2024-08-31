import { useSetRecoilState } from "recoil"
import { todoDescAtom, todoTitleAtom } from "../recoil/atoms";

export function AddTodo(){
    const setTodoDesc = useSetRecoilState(todoDescAtom);
    const setTodoTitle = useSetRecoilState(todoTitleAtom);
    return (
        <div className=" flex flex-col bg-white rounded-b-xl p-2">
            <input type="text" placeholder="Enter title" className="p-2 border-2 rounded-xl mx-2 my-1 text-lg"/>
            <input type="text" placeholder="Enter description" className="p-2 border-2 rounded-xl mx-2 my-1 text-lg"/>
            <button className="mt-3 p-2 bg-blue-900 text-xl text-slate-300 mx-10 rounded-3xl hover:bg-green-600 hover:text-white">Add Todo</button>
        </div>
    )
}