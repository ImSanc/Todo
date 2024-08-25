import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { HeaderBar } from "../components/HeaderBar";
import { InputComponent } from "../components/InputComponent";
import { Button } from "../components/LoginButton";
import { LoginHeader } from "../components/LoginHeader";
import { errorMessageAtom, firstNameAtom, lastNameAtom, passwordAtom, showErrorDialogAtom, visibleBackButtonAtom } from "../recoil/atoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthorizationSelector } from "../recoil/selector";
import axios from "axios";

export function UserDetail(){

    const setVisibleBackButton = useSetRecoilState(visibleBackButtonAtom);
    const navigate = useNavigate();
    const authorizationSelector = useRecoilValueLoadable(checkAuthorizationSelector);
    const [firstName,setFirstName] = useRecoilState(firstNameAtom);
    const [lastName,setLastName] = useRecoilState(lastNameAtom);
    const [password,setUserPassword] = useRecoilState(passwordAtom);
    const [showErrorDialog,setShowErrorDialog] = useRecoilState(showErrorDialogAtom);
    const [errorMessage,setErrorMessage] = useRecoilState(errorMessageAtom);

    useEffect( ()=>{
        setVisibleBackButton(true);
    },[])

    const onUpdateClick = async () => {
        try{
            const token = localStorage.getItem("token");
            const response = await axios.put("http://localhost:3000/api/v1/user/update",{
                password,
                firstName,
                lastName
            }, {headers:{
                'Authorization': token,
            }})
        }
        catch(error){
            setErrorMessage( error.response?.data?.message || 'An Unexpected error occured');
            setShowErrorDialog(true);
        }
    } 

    useEffect(()=>{

        if( authorizationSelector.state === 'hasValue' ){
            if( !authorizationSelector.contents.userExist ){
                navigate("/login");
            }
            else{
                setFirstName(()=>(authorizationSelector.contents.user.firstName));
                setLastName(()=>(authorizationSelector.contents.user.lastName));
            }
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

    return (
        <div className=" bg-[url('/loggedinBg.jpg')] bg-cover bg-center h-screen w-screen ">
           <HeaderBar/>
           <div className="w-screen mt-24 flex justify-center items-center">
                <div className="w-[80%] h-2/3 sm:w-[70%] md:w-[25%] bg-slate-400 p-2 rounded-2xl">
                    <LoginHeader heading={"User details"}></LoginHeader>
                    <InputComponent type={"text"} value={firstName} inputLabel={"First Name"} onChange={(e)=>{ setFirstName(e.target.value)}} />
                    <InputComponent type={"text"} value={lastName} inputLabel={"Last Name"}  onChange={(e)=>{ setLastName(e.target.value)}}/>
                    <InputComponent type={"password"} placeholder={"Enter new password to change"} inputLabel={"New Password"} onChange={(e)=>{ setUserPassword(e.target.value)}} />
                    <Button label={"Update"} onClick={onUpdateClick}/>
                </div>

           </div>
        </div>
    )
}