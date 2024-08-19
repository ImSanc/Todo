export function LoginHeader({heading, description}){
    return (
        <div className=" my-3  ">
            <div className="flex justify-center items-center font-bold  text-6xl">
                {heading}
            </div>
            <div className="flex justify-center items-center text-gray-500  text-xl pt-4 px-5 text-center">
                {description}
            </div>
        </div>
    )
}