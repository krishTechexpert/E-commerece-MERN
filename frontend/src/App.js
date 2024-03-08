import React,{useState} from 'react';
import './App.css';
import './default-base.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from './features/products/ProductDetails';
import AllProducts from './features/products/AllProducts';
import Register from "./features/user/Register"
import Login from "./features/user/Login"
import Dashboard from "./features/user/Dashboard"
import {useSelector} from 'react-redux';
import Profile from "./features/user/Profile";
import ProtectedRoute from './features/user/ProtectedRoute';
import UpdateProfile from './features/user/UpdateProfile';
import ChangePassword from './features/user/ChangePassword';
import { Routes, Route } from "react-router-dom";
import PageDisplay from "./components/layout/PageDisplay";
import NoMatch from "./components/layout/NoMatch";
import ForgotPassword from "./features/user/ForgotPassword";
import ResetPassword from "./features/user/ResetPassword";
import AboutUs from './components/AboutUs/AboutUs';
import Cart from "./features/cart/Cart";

function App() {
  const { isAuthenticated} = useSelector((state) => state.userData)

  return (
   
  <>
      <Header/>
      <main className='pt-14'>
      {/* 
          // old way
      <Routes>
        <Route extact path="/" element={<Home />} />
        <Route  path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/products" element={<AllProducts />} />
        <Route path="/products/:keyword" element={<AllProducts />} />
        
        <Route extact path="/register" element={<Register />} />
        <Route extact path="/login" element={<Login />} />
        
      
        <Route extact path="/dashboard" element={<Dashboard />} />

        <Route extact path="/profile" element={<ProtectedRoute auth={isAuthenticated || auth}><Profile /></ProtectedRoute>} />
        <Route extact path="/profile/update" element={<ProtectedRoute auth={isAuthenticated || auth}><UpdateProfile /></ProtectedRoute>} />

        <Route extact path="/password/update" element={<ProtectedRoute auth={isAuthenticated || auth}><ChangePassword /></ProtectedRoute>} />

      </Routes> */}

       {/*New way  */}

       <Routes>
            <Route path="/" element={<PageDisplay/>}>

                {/* index = A route that shares the same URL as the parent route but renders as the default child route inside of <Outlet> */}
                <Route index element={<Home />} />
               {!isAuthenticated && <>
                <Route  path="register" element={<Register />} />
                <Route  path="login" element={<Login />} />
                <Route path="password/forgot" element={<ForgotPassword />} />
                <Route path="password/reset/:resetToken" element={<ResetPassword />} />

                </>}

              

                <Route  path="product/:id" element={<ProductDetails />} />
                <Route path="products" element={<AllProducts />} />
                <Route path="products/:keyword" element={<AllProducts />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="cart" element={<Cart />} />


              
                <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="profile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
                <Route path="password/update" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

                <Route path="*" element={<NoMatch />} />
            </Route>
       </Routes>
      </main>          
      <Footer />
          
      </>
    
  )
}

export default App;
