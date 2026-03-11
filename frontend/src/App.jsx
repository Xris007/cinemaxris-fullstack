import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Dulceria from './pages/Dulceria'
import Pago from './pages/Pago'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dulceria" element={<Dulceria/>}/>
        <Route path="/pago" element={<Pago/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </>
  )
}

export default App
