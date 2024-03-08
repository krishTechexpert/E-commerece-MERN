import React,{useState,useEffect} from 'react'
import { Key } from 'lucide-react'
import { SchemaResetPasswordValidation } from "../../helper/Validate"
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import {resetPassword} from "./userSlice";
import Loader from '../../helper/Loader';
import { ToastContainer, toast } from 'react-toastify';
import AlertBanner from '../../helper/AlertBanner';
import { useNavigate } from 'react-router-dom';
import { Lock,Unlock } from 'lucide-react';
import { useParams,Link } from 'react-router-dom';
import { Store,Bird } from 'lucide-react';


export default function ResetPassword(){
    const dispatch = useDispatch();
    const { resetToken } = useParams();

    const { loading,error } = useSelector((state) => state.userData)
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const [open,setOpen]=useState(false);
    useEffect(() => {
        if(error){
          setIsSubmit(true)
        }
      },[error])

    const formik = useFormik({
        initialValues: {
          password:'',
          confirmPassword: ''
        },
    
        validationSchema: SchemaResetPasswordValidation,
        onSubmit: async (values, { resetForm }) => {
             dispatch(resetPassword({resetToken,values}))
        .then((res) => {
            if(res.payload?.success) {
             resetForm();
             setIsSubmit(false);
             toast.success(res.payload?.message +`you will be redirecting within 3 seconds... 👌`)
              setTimeout(() => {
                navigate('/login')
              },3000)
            }
         })
        
        }
      });


  return (
    <section>
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
             
              />
      <div className="flex items-center justify-center flex-col min-h-screen">
      <div className="inline-flex items-center justify-center w-full space-x-2 mb-5 cursor-pointer"  onClick={() => navigate('/')}>
                    <span>
                        <Store />
                    </span>
                    <span className="font-bold">Krish Store</span>
                    </div>
      {error && <AlertBanner result={error} isSubmit={isSubmit} setIsSubmit={setIsSubmit} />}

        {error?.includes('Token is invalid or has been expired')  ? 

        <>  <div className='flex flex-col justify-center'>
            <p className="mt-4 text-gray-500 text-center">
              Oops Something went to wrong  <Bird  size='200px' color='black'/>
            </p>
            <div className="mt-6 flex items-center justify-center space-x-3">
              <Link to="/"
                type="button"
                className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Shopping Continue
              </Link>
             
            </div>
            </div>
        </>: <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

<h2 className="text-center text-2xl font-bold leading-tight text-black">
  Set your new password
</h2>

<form onSubmit={formik.handleSubmit} className="mt-6">
  <div className="space-y-5">
   
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="" className="text-base font-medium text-gray-900">
         Password
        </label>
     
      </div>
      <div className="mt-2 relative pb-4">
      <input
          className={`flex h-10 w-full rounded-md border ${formik.touched.password && formik.errors.password  ? 'border-red-300' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
          type="password"
          placeholder="New Password"
          id="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.password}</div>
        ) : null}
      </div>
    </div>
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="" className="text-base font-medium text-gray-900">
           Confirm  Password
        </label>
     
      </div>
      <div className="mt-2 relative pb-4">
          <div className='absolute right-3 top-2 cursor-pointer' onClick={() => setOpen(!open)}>
          {open ? <Unlock  /> : <Lock />  }
          </div>
     
      <input
          className={`flex h-10 w-full rounded-md border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} bg-transparent pl-3 pr-12 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
          type={open ? "text" : "password"}
          placeholder="confirm Password"
          {...formik.getFieldProps("confirmPassword")}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
    </div>
    {loading && <div className='my-2'><Loader /></div>}

    <div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
      >
        Reset <Key className="ml-2" size={20} />
      </button>
    </div>
  </div>
</form>

</div>
        
        }
       
      </div>
    </section>
  )
}
