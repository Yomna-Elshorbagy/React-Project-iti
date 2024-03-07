import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Login from './Components/Login/Login'
import About from './Components/About/About'
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'
import NotFound from './Components/NotFound/NotFound'
import ForgetPass from './Components/ForgetPass/ForgetPass'
import Contact from './Components/Contact/Contact'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import Product from './Components/Product/Product'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import Checkout from './Components/CheckOut/Checkout'
import ProductDetails from'./Components/ProductDetails/ProductDetails'
import { useSelector } from 'react-redux'
import LoaderComponent from './Components/Loader/loader'
import Cart from './Components/Cart/Cart'
import Profile from './Components/Userprofile/Profile'

export default function App() {

  const routs = createBrowserRouter([
    {path:'', element:<LayOut/>, children:[
      {index:true, element: <Home/>},
      {path:"home", element:<Home/>},
      {path:"product", element:<ProtectedRoutes><Product/></ProtectedRoutes>},
      {path:"products/:id", element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
      {path:"about", element:<ProtectedRoutes><About/></ProtectedRoutes>},
      {path:"contact", element:<ProtectedRoutes><Contact/></ProtectedRoutes>},
      {path:"login", element:<Login/>},
      {path:"register", element:<Register/>},
      {path:"forgetpass", element:<ForgetPass/>},
      {path:"verifycode", element:<VerifyCode/>},
      {path:"profile", element:<Profile/>},
      {path:"resetpass", element:<ResetPassword/>},
      {path:"checkout", element:<ProtectedRoutes><Checkout/></ProtectedRoutes>},      
      {path:"cart", element:<ProtectedRoutes><Cart/></ProtectedRoutes>},      
      {path:"loader", element:<LoaderComponent/>},      
      
      {path:"*" , element: <NotFound />}

    ]}
  ])
  const theme = useSelector((state) => state.theme.theme)
  return (
    <>
        {/* <div  className={ 'text-light bg-dark' } > */}
        <div  className={ theme ==="dark" &&'text-light bg-dark' } >

      <RouterProvider router={routs}></RouterProvider>
      </div>
    </>
  )
}
