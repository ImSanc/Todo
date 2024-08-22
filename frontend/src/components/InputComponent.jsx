import classNames from "classnames"

const inputTypes = {
    text : "text",
    password : "password"
}
    
export function InputComponent({inputLabel,placeholder,type,value,onChange}){
    return (
        <div>
            <div className=" px-2 pb-2">
                <div className="font-medium  text-xl pb-1">
                    {inputLabel}
                </div>
                    <input className="bg-slate-100 p-3 w-full border-2 rounded-xl text-xl" type={classNames(inputTypes[type])} defaultValue={value}  placeholder={placeholder} onChange={onChange}/>
            </div>
        </div>
    )
}