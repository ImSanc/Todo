import axios from "axios";
import { selector } from "recoil";
import { firstNameAtom, lastNameAtom, logOutAtom, passwordAtom, tokenAtom } from "./atoms";

export const checkAuthorizationSelector = selector({
    key : "checkAuthorization",
    get : async({get})=>{
        try{
            
            const token = localStorage.getItem("token") || get(tokenAtom);
            get(logOutAtom);
            const res = await axios.get("http://localhost:3000/api/v1/user/user-exist",{
                headers : {
                    'Authorization' : token
                }
            });

            return res.data;
        }catch(error){
            return {
                userExist : false
            };
        }
    }
})