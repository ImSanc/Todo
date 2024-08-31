import { useRecoilRefresher_UNSTABLE, useRecoilState, useSetRecoilState,  } from "recoil"
import { errorMessageAtom, showAddTodoAtom, showErrorDialogAtom, showTodosAtom, todoDescAtom, todoTitleAtom } from "../recoil/atoms";
import axios from "axios";
import ErrorDialog from "./ErrorMessage";
import { useState } from "react";
import { getTodosSelector } from "../recoil/selector";

export function AddTodo(){
    const [todoDesc,setTodoDesc] = useRecoilState(todoDescAtom);
    const [todoTitle,setTodoTitle] = useRecoilState(todoTitleAtom);
    const [showErrorDialog,setShowErrorDialog] = useRecoilState(showErrorDialogAtom);
    const [errorMessage,setErrorMessage] = useRecoilState(errorMessageAtom);
    const setShowTodos = useSetRecoilState(showTodosAtom);
    const setShowTodoAdd = useSetRecoilState(showAddTodoAtom);
    const refreshAuthorization = useRecoilRefresher_UNSTABLE(getTodosSelector);
    const [backGround, setBackGround] = useState('');
    const token = localStorage.getItem("token");


    const addTodo = async ()=>{

        try{
            const response =  await axios.post("http://localhost:3000/api/v1/todos/addTodo",{
                title : todoTitle,
                description : todoDesc
            },{
                headers : {
                    Authorization : token
                }
            })

            if(response.data.added){
                setShowErrorDialog(true);
                setErrorMessage(response.data.message);
                refreshAuthorization();
                setBackGround("green");
                setTodoDesc("");
                setTodoTitle("");
                setTimeout( ()=>{
                    setErrorMessage("");
                    setShowErrorDialog(false);
                    setShowTodoAdd(false);
                    
                    setTimeout( ()=>{
                        setShowTodos(true);
                    } ,500);
                },700);
            }

        }
        catch(error){
            setErrorMessage( error.response?.data?.message || 'An Unexpected error occured');
            setShowErrorDialog(true);
            setBackGround('');
        }
    }

    const errorMessageCloseClick = ()=>{
        setShowErrorDialog(false);
        setErrorMessage("");
    }

    return (
        <div className=" flex flex-col bg-white rounded-b-xl p-2">
            <input type="text" placeholder="Enter title" className="p-2 border-2 rounded-xl mx-2 my-1 text-lg" onChange={ (e)=>{ setTodoTitle(e.target.value)}}/>
            <input type="text" placeholder="Enter description" className="p-2 border-2 rounded-xl mx-2 my-1 text-lg" onChange={ (e)=>{ setTodoDesc(e.target.value)} }/>
            <button className="mt-3 p-2 bg-blue-900 text-xl text-slate-300 mx-10 rounded-3xl hover:bg-green-600 hover:text-white" onClick={()=>{ addTodo() }}>Add Todo</button>
            { showErrorDialog && <ErrorDialog onClose={errorMessageCloseClick} message={errorMessage} color={backGround}/>}
        </div>
    )
}