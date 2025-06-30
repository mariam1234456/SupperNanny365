import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import QuickTips from './components/Quick-Tips/Quick-Tips'
import HowTo from './components/How-To/How-To'
import ChildTracker from './components/Child-Tracker/Child-Tracker'
import ToDo from './components/To-Do/To-Do'
import Home from './components/Home/Home'
import LayoutWithOutNav from './components/LayoutWithOutNav/LayoutWithOutNav'
import Register from './components/Register/Register'
import LogIn from './components/LogIn/LogIn'
import Welcome from './components/Welcome/Welcome'
import Congrat from './components/Congrat/Congrat'
import Todolist from './components/Todolist/Todolist'
import Importance from './components/Importance/Importance'
import MyProfile from './components/MyProfile/MyProfile'
import EditProfile from './components/EditProfile/EditProfile'
import EditProfileBaby from './components/EditProfileBaby/EditProfileBaby'
import './i18n';
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes'
import ProtectedAuth from './components/protectedAuth/protectedAuth'

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  }, []);
  
  let routes=createBrowserRouter([{
     path:"",element:<Layout />,children:[
      {index:true,element:<Home/>},
      {path:"todo",element:<ProtectedRoutes><ToDo/></ProtectedRoutes>,children:[
        {path:"import",element:<ProtectedRoutes><Importance/></ProtectedRoutes>},
        {path:"profile",element:<ProtectedRoutes><MyProfile/></ProtectedRoutes>,children:[
          {path:"edit",element:<ProtectedRoutes><EditProfile/></ProtectedRoutes>},
          {path:"baby",element:<ProtectedRoutes><EditProfileBaby/></ProtectedRoutes>},
        ]},
     ]},
      {path:"quicktips",element:<ProtectedRoutes><QuickTips/></ProtectedRoutes>},
      {path:"/howto/:category" ,element:<ProtectedRoutes><HowTo/></ProtectedRoutes>},
            {path:"/howto" ,element:<ProtectedRoutes><HowTo/></ProtectedRoutes>},

      {path:"childtracker",element:<ProtectedRoutes><ChildTracker/></ProtectedRoutes>},
      {path:"list",element:<ProtectedRoutes><Todolist/></ProtectedRoutes>},
     ],
  },
  {
    path:"",element:<LayoutWithOutNav/>,children:[
      {path:"login",element:<ProtectedAuth><LogIn/></ProtectedAuth>},
      {path:"register",element:<ProtectedAuth><Register/></ProtectedAuth>},
      {path:"welcome",element:<ProtectedRoutes><Welcome/></ProtectedRoutes>},
      {path:"congrate",element:<ProtectedRoutes><Congrat/></ProtectedRoutes>},
      

     ],
  },
])
  return (
    <>
    
    <RouterProvider router={routes}></RouterProvider>

    </>
  )
}

export default App
