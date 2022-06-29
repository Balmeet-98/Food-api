import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Login } from '../LogIn/Login';
import { Signup } from '../SignUp/Signup';
import { Protected } from '../Routing/Protected';
export const Routing = () => {
  return (
    <>
    <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/dashboard/*" element={<Protected/>} />
      </Routes>
    </>
  )
}
