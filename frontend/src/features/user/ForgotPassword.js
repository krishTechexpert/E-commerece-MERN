import React, { useState, useEffect } from 'react'
import { Key, NavigationOff } from 'lucide-react'
import { useFormik } from "formik";
import { SchemaForgotPasswordValidation } from "../../helper/Validate"
import Loader from '../../helper/Loader';
import { forgotPassword } from "./userSlice";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AlertBanner from '../../helper/AlertBanner';
import { ToastContainer, toast } from 'react-toastify';
import { Store } from 'lucide-react';


export default function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false)
    const { loading, error,isForgotPassword } = useSelector((state) => state.userData)
    const[disabledBtn,setDisableBtn]=useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },


        validationSchema: SchemaForgotPasswordValidation,
        onSubmit: async (values, { resetForm }) => {
             dispatch(forgotPassword(values))
            
             .then((res) => {
                if (res.error) {
                    setIsSubmit(true)
                }
    
                if (res.payload.success) {
                    resetForm()
                    setIsSubmit(false)
                     toast.success(res.payload.message+`you will be redirecting within 5 seconds... 👌`)
                     setDisableBtn(true)
                     setTimeout(() => {
                        navigate('/login')
                     },5000)
                }
             })
           
        }
    });
    return (
        <section>
            {error && <AlertBanner result={error} isSubmit={isSubmit} setIsSubmit={setIsSubmit} />}
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              style={{ width: "100%" }}
              //toastStyle={{ backgroundColor: "crimson",color:'white' }}
              //theme="colored"
              />
            <div className="flex items-center justify-center min-h-screen">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <div className="inline-flex items-center justify-center w-full space-x-2 mb-5 cursor-pointer"  onClick={() => navigate('/')}>
                    <span>
                        <Store />
                    </span>
                    <span className="font-bold">Krish Store</span>
                    </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Forgot password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 ">
                    No worries, we'll send you reset instructions.
                    </p>
                    <form onSubmit={formik.handleSubmit} method='POST' className="mt-8">
                        <div>

                            <div className='mb-2'>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">

                                    Email address
                                </label>
                                <div className="mt-2 relative pb-4">
                                    <input
                                        className={`flex h-10 w-full rounded-md border ${formik.touched.email && formik.errors.email ? 'border-red-300' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        {...formik.getFieldProps("email")}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                            </div>
                          

                            <div>
                                {loading && <Loader />}
                                <button
                                    type="submit"
                                    disabled={disabledBtn}
                                    className="inline-flex w-full mt-5 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white"
                                >
                                    Forgot <Key className="ml-2" size={20} />
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}
