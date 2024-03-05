import React from 'react'
import  Navbar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function LayOut() {
  return (
    <>
      <Navbar />
      
      <Outlet />

      <Footer />
    </>
  )
}
