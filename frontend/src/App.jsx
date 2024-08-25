
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/Signup'
import { UserDetail } from './pages/UserDetail'
import { RecoilRoot } from 'recoil'
import { MainDash } from './pages/MainDash'
import { LogIn } from './pages/LogIn'

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
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/user-details" element={<UserDetail/>}/>
          <Route path="/dashboard" element={<MainDash/>}/>
          <Route path = "*" element ={<Navigate to= "/login" />}/>
        </Routes>
      </BrowserRouter>
    </>
   )
}

export default App
