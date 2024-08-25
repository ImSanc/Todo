import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { InputComponent } from "../components/InputComponent";
import { Button } from "../components/LoginButton";
import { BottomFooter } from "../components/LoginFooter";
import { LoginHeader } from "../components/LoginHeader";
import { errorMessageAtom, passwordAtom, showErrorDialogAtom, tokenAtom, userEmailAtom } from "../recoil/atoms";
import axios from "axios";
import ErrorDialog from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkAuthorizationSelector } from "../recoil/selector";

export function LogIn(){

    const [username ,setUserName] = useRecoilState(userEmailAtom);
    const [password ,setUserPassword] = useRecoilState(passwordAtom);
    const [showErrorDialog ,setShowErrorDialog] = useRecoilState(showErrorDialogAtom);
    const [errorMessage ,setErrorMessage] = useRecoilState(errorMessageAtom);
    const setTokenAtom = useSetRecoilState(tokenAtom);
    const authorizationSelector = useRecoilValueLoadable(checkAuthorizationSelector);
    const navigate = useNavigate();

    useEffect(()=>{

        if( authorizationSelector.state === 'hasValue' && authorizationSelector.contents.userExist){
            navigate("/dashboard");
        }
    },[authorizationSelector.state,authorizationSelector.contents,navigate])

    if(authorizationSelector.state === 'loading') {
        return <div className=" bg-slate-700 text-white text-lg flex justify-center items-center w-screen h-screen">
                Loading....
            </div>
    }

    if(authorizationSelector.state === 'hasError') {
        return <div className=" bg-red-200 text-white text-lg flex justify-center items-center w-screen h-screen">
                Error occurred while checking authorization.
            </div>
    }
    const logIn = async ()=>{
        try{
            const response  = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
            })
            if(response.data.token){
                const token = `Bearer ${ response.data.token}`;
                localStorage.setItem("token",token);
                setTokenAtom(token);
                navigate("/dashboard");
            }
            else{
                throw new Error("No token received")
            }
        }
        catch(error){
            setErrorMessage(error.response?.data?.message || "An unexpected error occured");
            setShowErrorDialog(true);
        }
    }

    const closeDialog = () =>{
        setShowErrorDialog(false);
    }

    return (
        <div className=" bg-[url('/loginBackground.jpg')] bg-cover bg-center h-screen w-screen flex justify-center items-center">
            <div className=" w-[80%] h-90 sm:w-[50%] md:w-[40%] lg:w-[30%] bg-slate-400 p-2 rounded-2xl " >
                <LoginHeader heading={"Log In"} description={"Enter your information to log into your account"}/>
                <InputComponent type={"text"} placeholder={"Enter Email"} inputLabel={"E-mail"} onChange={ (e)=>{
                    setUserName(e.target.value);
                }} />
                <InputComponent type={"password"} placeholder={"Enter password"} inputLabel={"Password"} onChange={ (e)=>{
                    setUserPassword(e.target.value);
                }}/>
                <Button label={"Log in"} onClick={logIn}/>
                <BottomFooter information={"Don't have an account?"} linkTo={"/signup"} linkLabel={"Sign up"} />
                { showErrorDialog && <ErrorDialog message={errorMessage} onClose={closeDialog} />}
            </div>
        </div>
    )
}