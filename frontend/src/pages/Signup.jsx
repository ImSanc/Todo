
import { InputComponent } from "../components/InputComponent";
import { Button } from "../components/LoginButton";
import { BottomFooter } from "../components/LoginFooter";
import { LoginHeader } from "../components/LoginHeader";
import { useRecoilState, useRecoilValue } from "recoil";
import {  checkAuthorizationSelector, errorMessageAtom, firstNameAtom, lastNameAtom, passwordAtom, showErrorDialogAtom, userEmailAtom } from "../recoil/atoms";
import axios from 'axios'
import ErrorDialog from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function SignUp(){

    const [username,setUserEmail] = useRecoilState(userEmailAtom);
    const [firstName,setFirstName] = useRecoilState(firstNameAtom);
    const [lastName,setLastName] = useRecoilState(lastNameAtom);
    const [password,setUserPassword] = useRecoilState(passwordAtom);
    const [showErrorDialog,setShowErrorDialog] = useRecoilState(showErrorDialogAtom);
    const [errorMessage,setErrorMessage] = useRecoilState(errorMessageAtom);
    const authorizationSelector = useRecoilValue(checkAuthorizationSelector);
    const navigate = useNavigate();

    useEffect( ()=>{
      if(authorizationSelector){
        navigate("/dashboard");
      }
    },[])

    const signUpUser = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
          username,
          firstName,
          lastName,
          password
        });
  
        if (response.data.token) {
          localStorage.setItem("token", `Bearer ${response.data.token}`);
          navigate("/todoScreen")
        }
        else {
          throw new Error('No token received');
        }

      } catch (error) {
        setErrorMessage( error.response?.data?.message || 'An unexpected error occurred');
        setShowErrorDialog(true);
      }
    };
  
    const closeDialog = () => {
      setShowErrorDialog(false);
      setErrorMessage('');
    };

    return (
        <div className=" bg-[url('/loginBackground.jpg')] bg-cover bg-center h-screen w-screen flex justify-center items-center">
            <div className={`${ showErrorDialog ? "h-[95%]" : "h-110"} w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%]  bg-slate-400 p-2 rounded-2xl  `}>
                <LoginHeader heading={"Sign up"} description={"Enter your information to create an account"}/>
                <InputComponent inputLabel={"First Name"} placeholder={"Enter first name"} type={"text"} onChange={ (e)=>{
                    setFirstName(e.target.value)
                }} />
                <InputComponent inputLabel={"Last Name"} placeholder={"Enter last name"} type={"text"} onChange={ (e)=>{
                    setLastName(e.target.value)
                }} />
                <InputComponent inputLabel={"E-mail"} placeholder={"Enter e-mail"} type={"text"} onChange={ (e)=>{
                    setUserEmail(e.target.value)
                }} />
                <InputComponent inputLabel={"Password"} placeholder={"Enter password"} type={"password"} onChange={ (e)=>{
                    setUserPassword(e.target.value)
                }} />
               
                <Button label={"Sign Up"} onClick={signUpUser} />
                <BottomFooter information={"Already have an account?"} linkTo={"/login"} linkLabel={"Log In"}/>
                {showErrorDialog && <ErrorDialog message={errorMessage} onClose={closeDialog} />}
            </div>
        </div>
    )
}