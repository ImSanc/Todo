import { Link, Navigate } from "react-router-dom"

export function HeaderBar({visibleBackButton,username}){

    // function onBackButtonClick(){
    //     Navigate.
    // }

    return(
        <div className="bg-slate-700 w-screen h-20 border-b-2 border-slate-500 rounded-m flex justify-between">
            {visibleBackButton ?
             <div className="flex justify-center items-center p-3 ">
               <Link to='/todo'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white bg-slate-500 w-10 h-10 p-2 rounded-full transform transition-transform duration-300 hover:scale-125">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Link>
               </div>
               : <div> </div>
            }

            <div className=" pt-4 font-semibold text-4xl text-gray-400 mr-5">
                Todo Application
            </div>

            <div className="flex justify-center items-center p-4">
                <div className="rounded-full bg-blue-300 h-16 w-16 flex justify-center items-center text-4xl font-semibold pb-1">
                    S
                </div>
            </div>
        </div>
    )
}