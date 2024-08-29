
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { HeaderBar } from "../components/HeaderBar";

import { TodoListComp } from "../components/TodoListComp";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firstNameAtom, lastNameAtom, removeDetailfromDropDownAtom } from "../recoil/atoms";
import { checkAuthorizationSelector } from "../recoil/selector";

export function MainDash(){

    const [firstName,setFirstName] = useRecoilState(firstNameAtom);
    const [lastName,setLastName] = useRecoilState(lastNameAtom);
    const authorizationSelector = useRecoilValueLoadable(checkAuthorizationSelector);
    const setRemoveDetailsOption = useSetRecoilState(removeDetailfromDropDownAtom);
    const navigate = useNavigate();

    useEffect(()=>{

        if( authorizationSelector.state === 'hasValue' ){
            if( !authorizationSelector.contents.userExist ){
                navigate("/login");
            }
            else{
                setFirstName(()=>(authorizationSelector.contents.user.firstName));
                setLastName(()=>(authorizationSelector.contents.user.lastName));
            }
        }
        setRemoveDetailsOption(false);

    },[authorizationSelector.state,authorizationSelector.contents,navigate,lastName,firstName])

    if(authorizationSelector.state === 'loading') {
        return <div className=" bg-slate-700 text-white text-lg flex justify-center items-center w-screen h-screen">
                Loading....
            </div>
    }

    if(authorizationSelector.state === 'hasError') {
        return <div className=" bg-red-200 text-white text-lg flex justify-center items-center w-screen h-screen">
                Error occurred while checking authorization.
            </div>
    }

    return (
        <div className=" bg-[url('/loggedinBg.jpg')] bg-cover bg-center w-screen h-screen">
            <HeaderBar />
            <TodoListComp/>
        </div>
    )
}