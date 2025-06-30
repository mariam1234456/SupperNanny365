import { Navigate } from "react-router-dom";
import style from "./protectedAuth.module.css"
import React from 'react'

export default function protectedAuth(props) {
  if (localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")){
    return <Navigate to="/todo"></Navigate>
  }else{
    return props.children;
  }
}
