import { Navigate } from "react-router-dom";
import style from "./ProtectedRoutes.module.css"
import React from 'react'

export default function ProtectedRoutes(props) {
  if (localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")){
    return props.children;
  }else{
    return <Navigate to="/login"></Navigate>
  }
}
