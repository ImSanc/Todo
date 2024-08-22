export function Button({label,onClick}){
    return (
        <div>
            <button className="w-full h-14 bg-slate-800 text-white text-2xl rounded-xl mt-1  hover:opacity-80" onClick={onClick}>{label}</button>
        </div>
    )
}