import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {  isDropDownOpenAtom, logOutAtom, passwordAtom, removeDetailfromDropDownAtom, tokenAtom, userEmailAtom } from "../recoil/atoms";
import { checkAuthorizationSelector } from "../recoil/selector";

export function DropDown(){

    const[isOpen,setIsOpen] =  useRecoilState(isDropDownOpenAtom);
    const setUserName =  useSetRecoilState(userEmailAtom);
    const setUserPassword =  useSetRecoilState(passwordAtom);
    const setLogOut = useSetRecoilState(logOutAtom);
    const setToken = useSetRecoilState(tokenAtom);
    const dropDownRef = useRef(null);
    const navigate = useNavigate();
    const refreshAuthorization = useRecoilRefresher_UNSTABLE(checkAuthorizationSelector);
    const removeDetailfromDropDown = useRecoilValue(removeDetailfromDropDownAtom);

    const handleClickOutSide = (event)=>{
        if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
            setIsOpen(false);
        }
    };

    useEffect( () => {
        document.addEventListener('mousedown',handleClickOutSide);

        return () =>{
            document.removeEventListener('mousedown',handleClickOutSide);
        }
    },[])

    const logOutClick = () => {
        localStorage.removeItem("token");
        setIsOpen(false);
        setTimeout( ()=>{
            refreshAuthorization();
            setToken("");
            setLogOut(true);
            setUserName("");
            setUserPassword("");
            navigate("/login");
        },1000);        
    }

    return (
        <div className="relative mt-16" ref={dropDownRef}>
            {
                isOpen 
                &&
                <div className=" absolute right-0 p-1 mt-2 w-48 bg-slate-800 text-white border border-gray-800 rounded shadow-lg z-10">
                    { !removeDetailfromDropDown && <Link className="block px-4 py-2 hover:bg-gray-600 hover:cursor-pointer" to="/user-details" onClick={()=>{
                        setIsOpen(false)
                    }}>
                        Update Details
                    </Link> }
                    <div className="block px-4 py-2  hover:text-red-500 hover:bg-gray-600 hover:cursor-pointer" onClick={ ()=>{ logOutClick() }} > 
                        Log Out
                    </div>
                </div>
            }
        </div>
    )
}