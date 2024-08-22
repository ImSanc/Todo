
import { InputComponent } from "../components/InputComponent";
import { Button } from "../components/LoginButton";
import { BottomFooter } from "../components/LoginFooter";
import { LoginHeader } from "../components/LoginHeader";
import { useRecoilState } from "recoil";
import {  errorMessageAtom, firstNameAtom, lastNameAtom, passwordAtom, showErrorDialogAtom, userEmailAtom } from "../recoil/atoms";
import axios from 'axios'
import ErrorDialog from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

export function SignUp(){

    const [username,setUserEmail] = useRecoilState(userEmailAtom);
    const [firstName,setFirstName] = useRecoilState(firstNameAtom);
    const [lastName,setLastName] = useRecoilState(lastNameAtom);
    const [password,setUserPassword] = useRecoilState(passwordAtom);
    const [showErrorDialog,setShowErrorDialog] = useRecoilState(showErrorDialogAtom);
    const [errorMessage,setErrorMessage] = useRecoilState(errorMessageAtom);
    const navigate = useNavigate();

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
        setErrorMessage('An unexpected error occurred');
        setShowErrorDialog(true);
      }
    };
  
    const closeDialog = () => {
      setShowErrorDialog(false);
      setErrorMessage('');
    };

    return (
        <div className=" bg-[url('/loginBackground.jpg')] bg-cover bg-center h-screen w-screen flex justify-center items-center">
            <div className={` w-[80%] ${ showErrorDialog ? "h-[74%]" : "h-110"} sm:w-[50%] md:w-[25%] bg-slate-400 p-2 rounded-2xl  `}>
                <LoginHeader heading={"Sign up"} description={"Enter your information to create an account"}/>
                <InputComponent inputLabel={"First Name"} placeholder={"David"} type={"text"} onChange={ (e)=>{
                    setFirstName(e.target.value,setFirstName)
                }} />
                <InputComponent inputLabel={"Last Name"} placeholder={"Ornstein"} type={"text"} onChange={ (e)=>{
                    setLastName(e.target.value,setLastName)
                }} />
                <InputComponent inputLabel={"E-mail"} placeholder={"davidOrnstein@gmail.com"} type={"text"} onChange={ (e)=>{
                    setUserEmail(e.target.value,setUserEmail)
                }} />
                <InputComponent inputLabel={"Password"} placeholder={"david123"} type={"password"} onChange={ (e)=>{
                    setUserPassword(e.target.value,setUserPassword)
                }} />
               
                <Button label={"Sign Up"} onClick={signUpUser} />
                <BottomFooter information={"Already have an account?"} linkTo={"/signin"} linkLabel={"Sign in"}/>
                {showErrorDialog && <ErrorDialog message={errorMessage} onClose={closeDialog} />}
            </div>
        </div>
    )
}