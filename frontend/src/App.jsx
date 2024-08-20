
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/Signup'
import { SignIn } from './pages/SignIn'
import { UserDetail } from './pages/UserDetail'

function App() {
 return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/user-details" element={<UserDetail/>}/>
        <Route path = "*" element ={<Navigate to= "/todoScreen" />}/>
      </Routes>
    </BrowserRouter>
  </>
 )
}

export default App
