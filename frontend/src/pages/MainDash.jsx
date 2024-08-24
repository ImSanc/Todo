import { HeaderBar } from "../components/HeaderBar";
import { InputComponent } from "../components/InputComponent";
import { TodoHeader } from "../components/TodoHeader";

export function MainDash(){

    return (
        <div className=" bg-[url('/loggedinBg.jpg')] bg-cover bg-center w-screen h-screen">
            <HeaderBar />
            <div className ="flex justify-center items-center h-[90%] w-screen" >
                <div className="bg-slate-500 w-[90%] h-[95%] rounded-lg flex flex-col justify-center items-center ">
                    <div className=" w-[90%] h-[60%] bg-slate-100 sm:w-[70%] md:w-[30%] rounded-lg mt-4">
                        <TodoHeader header={"Todo's"} />
                    </div>
                </div>

            </div>
        </div>
    )
}