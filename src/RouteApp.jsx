import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Auth } from './pages/Auth'
import { NavBar } from './components/NavBar'
import Home from './pages/Home'
import { useEffect, useState } from 'react'
import { AuthProvider } from './components/Context/Auth'

export default function RouteApp() {

    const savedUser = localStorage.getItem("user");

    return (
        <BrowserRouter>
            <AuthProvider>
            <div className=' w-[100vw] h-screen flex flex-col p-3'> 
                {savedUser && <NavBar/>}
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </div>
            </AuthProvider>
        </BrowserRouter>    
    )
}