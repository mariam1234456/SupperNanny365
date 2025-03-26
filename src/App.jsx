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
import { useEffect } from 'react'

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  }, []);

  let routes=createBrowserRouter([{
     path:"",element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:"todo",element:<ToDo/>,children:[
        {path:"import",element:<Importance/>},
        {path:"profile",element:<MyProfile/>,children:[
          {path:"edit",element:<EditProfile/>},
          {path:"baby",element:<EditProfileBaby/>},
        ]},
     ]},
      {path:"quicktips",element:<QuickTips/>},
      {path:"howto",element:<HowTo/>},
      {path:"childtracker",element:<ChildTracker/>},
      {path:"list",element:<Todolist/>},
     ],
  },
  {
    path:"",element:<LayoutWithOutNav/>,children:[
      {path:"login",element:<LogIn/>},
      {path:"register",element:<Register/>},
      {path:"welcome",element:<Welcome/>},
      {path:"congrate",element:<Congrat/>},
      

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
