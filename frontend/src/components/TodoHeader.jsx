
export function TodoHeader({header,showTodo,onClick}){
    return (
        <div className={ `flex justify-between items-center bg-blue-900 ${ showTodo ? "rounded-t-xl" : "rounded-xl"} py-2 px-6 `} onClick={onClick}>
            <div className="font-medium text-4xl p-2 text-slate-300">
                {header}
            </div>
            <div >
                {
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`text-white w-8 h-8 font-medium transition-transform duration-300 ${showTodo ? 'rotate-180' : 'rotate-0'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                 }
                
            </div>
        </div>
    )
}