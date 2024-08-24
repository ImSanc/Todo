
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/Signup'
import { SignIn } from './pages/SignIn'
import { UserDetail } from './pages/UserDetail'
import { RecoilRoot } from 'recoil'
import { MainDash } from './pages/MainDash'

function App() {
  return (
  <RecoilRoot>
    <MainApplication />
  </RecoilRoot>
  )
}

function MainApplication(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/user-details" element={<UserDetail/>}/>
          <Route path="/dashboard" element={<MainDash/>}/>
          <Route path = "*" element ={<Navigate to= "/dashboard" />}/>
        </Routes>
      </BrowserRouter>
    </>
   )
}

export default App
