
export function TodoHeader({header}){
    return (
        <div className="flex justify-between items-center bg-blue-900 rounded-t-lg py-2 px-6">
            <div className="font-medium text-4xl p-2 text-slate-300">
                {header}
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white size-8 font-medium">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </div>
        </div>
    )
}