import { InputComponent } from "../components/InputComponent";
import { Button } from "../components/LoginButton";
import { BottomFotter } from "../components/LoginFooter";
import { LoginHeader } from "../components/LoginHeader";

export function SignUp(){
    return (
        <div className=" bg-[url('/loginBackground.png')] bg-cover bg-center h-screen w-screen flex justify-center items-center">
            <div className=" w-[80%] h-110 sm:w-[50%] md:w-[25%] bg-white p-2 rounded-2xl border-2 border-cyan-600 ">
                <LoginHeader heading={"Sign up"} description={"Enter your information to create an account"}/>
                <InputComponent inputLabel={"First Name"} placeholder={"David"}/>
                <InputComponent inputLabel={"Last Name"} placeholder={"Ornstein"}/>
                <InputComponent inputLabel={"Email"} placeholder={"davidOrnstein@gmail.com"}/>
                <InputComponent inputLabel={"Password"} placeholder={"david123"}/>
                <Button label={"Sign Up"}/>
                <BottomFotter information={"Already have an account?"} linkTo={"/signin"} linkLabel={"Sign in"}/>
            </div>
        </div>
    )
}