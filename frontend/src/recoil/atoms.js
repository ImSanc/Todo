import axios from 'axios';
import { atom, selector } from 'recoil';

export const userEmailAtom = atom({
    key : 'userEmail',
    default : ''
})

export const firstNameAtom = atom({
    key : 'firstName',
    default : ''
})

export const lastNameAtom = atom({
    key : 'lastName',
    default : ''
})

export const passwordAtom = atom({
    key : 'password',
    default : ''
})

export const showErrorDialogAtom = atom({
    key : 'showErrorDialog',
    default : false
})

export const errorMessageAtom = atom({
    key : 'errorMessage',
    default : ''
})

export const showTodosAtom = atom({
    key : 'showTodos',
    default: false
})

export const checkAuthorizationSelector = selector({
    key : "checkAuthorization",
    get : async()=>{
        try{
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/api/v1/user/user-exist",{
                headers : {
                    'Authorization' : token
                }
            });

            return res.data.userExist;
        }catch(error){
            return false;
        }
    }
})