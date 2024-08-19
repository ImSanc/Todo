
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/Signup'

function App() {
 return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path = "*" element ={<Navigate to= "/todoScreen" />}/>
      </Routes>
    </BrowserRouter>
  </>
 )
}

export default App
