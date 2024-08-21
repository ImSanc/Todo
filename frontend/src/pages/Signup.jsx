import { InputComponent } from "../components/InputComponent";
import { Button } from "../components/LoginButton";
import { BottomFooter } from "../components/LoginFooter";
import { LoginHeader } from "../components/LoginHeader";

export function SignUp(){
    return (
        <div className=" bg-[url('/loginBackground.jpg')] bg-cover bg-center h-screen w-screen flex justify-center items-center">
            <div className=" w-[80%] h-110 sm:w-[50%] md:w-[25%] bg-slate-400 p-2 rounded-2xl p-2 ">
                <LoginHeader heading={"Sign up"} description={"Enter your information to create an account"}/>
                <InputComponent inputLabel={"First Name"} placeholder={"David"} type={"text"}/>
                <InputComponent inputLabel={"Last Name"} placeholder={"Ornstein"} type={"text"}/>
                <InputComponent inputLabel={"E-mail"} placeholder={"davidOrnstein@gmail.com"} type={"text"}/>
                <InputComponent inputLabel={"Password"} placeholder={"david123"} type={"password"}/>
                <Button label={"Sign Up"}/>
                <BottomFooter information={"Already have an account?"} linkTo={"/signin"} linkLabel={"Sign in"}/>
            </div>
        </div>
    )
}