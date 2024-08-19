export function Button({label}){
    return (
        <div>
            <button className="w-full h-14 bg-slate-800 text-white text-2xl rounded-xl mt-3  hover:opacity-80">{label}</button>
        </div>
    )
}