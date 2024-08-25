
import { useRecoilValue } from "recoil";
import { HeaderBar } from "../components/HeaderBar";

import { TodoListComp } from "../components/TodoListComp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthorizationSelector } from "../recoil/atoms";

export function MainDash(){

    const authorizationSelector = useRecoilValue(checkAuthorizationSelector);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!authorizationSelector){
            navigate("/login");
        }
    },[])

    return (
        <div className=" bg-[url('/loggedinBg.jpg')] bg-cover bg-center w-screen h-screen">
            <HeaderBar />
            <TodoListComp/>
        </div>
    )
}