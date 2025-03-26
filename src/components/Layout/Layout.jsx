import { Outlet } from "react-router-dom"
import style from "./Layout.module.css"
import React from 'react'
import Navbar from '../Navbar/Navbar'


export default function Layout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
 
    </>
  )
}
