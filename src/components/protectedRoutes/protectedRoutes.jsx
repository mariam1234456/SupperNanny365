import { Navigate } from "react-router-dom";
import style from "./protectedRoutes.module.css"
import React from 'react'

export default function protectedRoutes(props) {
  if (localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")){
    return props.children;
  }else{
    return <Navigate to="/login"></Navigate>
  }
}
