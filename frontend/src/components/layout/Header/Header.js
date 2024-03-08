import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Store,ShoppingCart } from 'lucide-react';
import Search from "./Search";
import DropDown from "./DropDown";
import { useSelector } from 'react-redux';
import Navigation from "./Navigation";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.userData)
  const { cartList: products } = useSelector((state) => state.cart)

  const navigate = useNavigate()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const page = window.location.pathname.substring(1)
  useEffect(() => {
    setIsMenuOpen(false)
  }, [navigate])

  // hide Header for forgotpassword and reset password screen
  const resetPage = window.location.pathname;
  const resetToken = window.location.pathname.substring(16);
  const forgotAndResetPasswordScreen = resetPage === '/password/forgot' || resetPage == `/password/reset/${resetToken}`


  return <>
    {forgotAndResetPasswordScreen ? null :
      <div className="fixed left-0 top-0 w-full z-10 bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <span>
              <Store />
            </span>
            <span className="font-bold">Krish Store</span>
          </div>
          {page !== 'register' && page !== 'login' ?

            <div className="hidden grow items-start lg:flex">

              <Navigation className="ml-12 inline-flex space-x-8" />

            </div> : ''}




          <Search checkPage={page === 'register' || page === 'login' ? true : false} />
         
         <Link to='/cart'> <span className="flex mr-6 relative"><ShoppingCart size='40px' /><span className="absolute -right-3 -top-1 rounded-full bg-yellow-400  w-7 h-7 text-black font-mono text-sm  flex items-center justify-center ">{products.length > 0 ? products.length : 0}
    </span> </span></Link>
         
          {!isAuthenticated &&
            <div className="hidden space-x-2 lg:flex">
              <ButtonGroup />
            </div>
          }
          {isAuthenticated && <DropDown name={user?.name} role={user?.role} avatar={user?.avatar} />}


          <div className="lg:hidden">
            <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
          </div>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">


                      <span>
                        <Store />
                      </span>
                      <span className="font-bold">Krish </span>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                      <Navigation />

                    </nav>
                  </div>
                  {!isAuthenticated &&
                    <div className="mt-2 space-y-2">
                      <ButtonGroup />
                    </div>
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    }
  </>
};

export default Header

function ButtonGroup() {
  const navigate = useNavigate()

  return <>
    <button
      type="button"
      onClick={() => navigate('/register')}
      className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      Register
    </button>
    <button
      type="button"
      onClick={() => navigate('/login')}
      className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      Log In
    </button>

  </>
} 
