import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {  isDropDownOpenAtom } from "../recoil/atoms";

export function DropDown(){
    const[isOpen,setIsOpen] =  useRecoilState(isDropDownOpenAtom);
    const dropDownRef = useRef(null);

    const toggleDropdown = ()=>{
        setIsOpen(!isOpen);
    };

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
        <div className="relative" ref={dropDownRef}>
            {
                isOpen 
                &&
                <div className=" absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-100" to="/user-details">
                        Update Details
                    </Link>
                    <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Log Out
                    </div>
                </div>
            }
        </div>
    )
}