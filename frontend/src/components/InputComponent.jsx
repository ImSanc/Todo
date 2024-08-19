export function InputComponent({inputLabel,placeholder}){
    return (
        <div>
            <div className=" px-2 pb-2">
                <div className="font-medium  text-xl pb-1">
                    {inputLabel}
                </div>
                    <input type="text" placeholder={placeholder}  className=" p-3 w-full border-2 rounded-xl text-xl"/>
            </div>
        </div>
    )
}