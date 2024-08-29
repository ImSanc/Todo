import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {  isDropDownOpenAtom } from "../recoil/atoms";

export function DropDown( { logOutClick} ){

    const[isOpen,setIsOpen] =  useRecoilState(isDropDownOpenAtom);
    const dropDownRef = useRef(null);

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

    

    return (
        <div className="relative mt-16" ref={dropDownRef}>
            {
                isOpen 
                &&
                <div className=" absolute right-0 p-1 mt-2 w-48 bg-slate-800 text-white border border-gray-800 rounded shadow-lg z-10">
                    <Link className="block px-4 py-2 hover:bg-gray-600 hover:cursor-pointer" to="/user-details" onClick={()=>{
                        setIsOpen(false)
                    }}>
                        Update Details
                    </Link>
                    <div className="block px-4 py-2  hover:text-red-500 hover:bg-gray-600 hover:cursor-pointer" onClick={ ()=>{ logOutClick }} > 
                        Log Out
                    </div>
                </div>
            }
        </div>
    )
}