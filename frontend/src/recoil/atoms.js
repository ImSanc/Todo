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