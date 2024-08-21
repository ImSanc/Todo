import { InputComponent } from "../components/InputComponent";
import { Button } from "../components/LoginButton";
import { BottomFooter } from "../components/LoginFooter";
import { LoginHeader } from "../components/LoginHeader";

export function SignIn(){
    return (
        <div className=" bg-[url('/loginBackground.jpg')] bg-cover bg-center h-screen w-screen flex justify-center items-center">
            <div className=" w-[80%] h-90 sm:w-[50%] md:w-[25%] bg-slate-400 p-2 rounded-2xl p-2" >
                <LoginHeader heading={"Sign in"} description={"Enter your information to log into your account"}/>
                <InputComponent type={"text"} placeholder={"david@gmail.com"} inputLabel={"E-mail"} />
                <InputComponent type={"password"} placeholder={"david123"} inputLabel={"Password"}/>
                <Button label={"Sign in"}/>
                <BottomFooter information={"Don't have an account?"} linkTo={"/signup"} linkLabel={"Sign up"} />
            </div>
           
        </div>
    )
}