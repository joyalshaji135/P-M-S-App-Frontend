import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Reg from './Pages/Reg'
import AdminDashboard from './Pages/dashboards/AdminDashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Reg/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      </Routes>
    </>
  )
}

export default App
