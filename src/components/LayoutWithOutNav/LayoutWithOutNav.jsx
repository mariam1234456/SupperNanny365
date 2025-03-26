import { Outlet } from "react-router-dom"
import style from "./LayoutWithOutNav.module.css"
import React from 'react'

export default function LayoutWithOutNav() {
  return (
    <>
    <Outlet/>
    </>
  )
}
