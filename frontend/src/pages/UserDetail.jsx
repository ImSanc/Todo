import { HeaderBar } from "../components/HeaderBar";
import { InputComponent } from "../components/InputComponent";
import { Button } from "../components/LoginButton";
import { LoginHeader } from "../components/LoginHeader";

export function UserDetail(){
    return (
        <div className=" bg-[url('/loggedinBg.jpg')] bg-cover bg-center h-screen w-screen ">
           <HeaderBar visibleBackButton={true} username={"sanchit"}/>
           <div className="w-screen mt-24 flex justify-center items-center">
                <div className="w-[80%] h-2/3 sm:w-[70%] md:w-[25%] bg-slate-400 p-2 rounded-2xl">
                    <LoginHeader heading={"User details"}></LoginHeader>
                    <InputComponent type={"text"} value={"sanchit"} inputLabel={"First Name"}  />
                    <InputComponent type={"text"} value={"mishra"} inputLabel={"Last Name"}  />
                    <InputComponent type={"password"} value={"sanchit@17"} inputLabel={"Password"}  />
                    <Button label={"Update"}/>
                </div>

           </div>
        </div>
    )
}