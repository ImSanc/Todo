import classNames from "classnames"

const inputTypes = {
    text : "text",
    password : "password"
}
    
export function InputComponent({inputLabel,placeholder,type,value}){
    return (
        <div>
            <div className=" px-2 pb-2">
                <div className="font-medium  text-xl pb-1">
                    {inputLabel}
                </div>
                    <input defaultValue={value} type={classNames(inputTypes[type])} placeholder={placeholder}  className="bg-slate-100 p-3 w-full border-2 rounded-xl text-xl"/>
            </div>
        </div>
    )
}