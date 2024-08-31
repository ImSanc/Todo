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

export const getTodosSelector = selector({
    key : "getTodoSelector",
    get : async ({get}) => {
        try{
            const token = localStorage.getItem("token" || get(tokenAtom));

            const response = await axios.get("http://localhost:3000/api/v1/todos/getTodos",{
                headers : {
                    'Authorization' : token
                }
            });

            return response.data;
        }
        catch(error){
            return {
                todos : []
            };
        }
    }
})