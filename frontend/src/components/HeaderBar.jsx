import { Link, Navigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { firstNameAtom, isDropDownOpenAtom } from "../recoil/atoms"
import { DropDown } from "./DropDown";
import { useState } from "react";

export function HeaderBar({visibleBackButton}){

    const firstName = useRecoilValue(firstNameAtom);
    const [isDropdownOpen, setIsDropdownOpen] = useRecoilState(isDropDownOpenAtom);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return(
        <div className="bg-slate-700 w-screen h-20 border-b-2 border-slate-500 rounded-m flex justify-between">
            {visibleBackButton ?
             <div className="flex justify-center items-center p-4 ">
               <Link to='/todo'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white bg-slate-500 w-10 h-10 p-2 rounded-full transform transition-transform duration-300 hover:scale-125">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Link>
               </div>
               : <div className="flex justify-center items-center p-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white w-10 h-10 p-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                    </svg>
                 </div>
            }

            <div className=" pt-4 font-semibold text-4xl text-gray-400 mr-5">
                Todo Application
            </div>

            <div className="flex justify-center items-center p-4">
                <div className={`transform transition-transform duration-300 ${ !visibleBackButton ? "hover:cursor-pointer hover:scale-110" : ""} rounded-full bg-blue-300 h-16 w-16 flex justify-center items-center text-4xl font-semibold pb-1`} onClick={toggleDropdown}>
                      {firstName.charAt(0)}
                </div>
                {isDropdownOpen && <DropDown />} {/* Render dropdown if open */}
            </div>
        </div>
    )
}