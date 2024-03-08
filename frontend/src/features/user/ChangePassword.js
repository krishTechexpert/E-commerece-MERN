import React,{useState,useEffect} from 'react'
import { ArrowRight } from 'lucide-react'
import { SchemaChangePasswordValidation } from "../../helper/Validate"
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import {changePassword} from "./userSlice";
import Loader from '../../helper/Loader';
import { ToastContainer, toast } from 'react-toastify';
import AlertBanner from '../../helper/AlertBanner';
import { useNavigate } from 'react-router-dom';
import { Lock,Unlock } from 'lucide-react';


export default function ChangePassword(){
    const dispatch = useDispatch();
    const { user,loading,isAuthenticated,error } = useSelector((state) => state.userData)
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
         oldPassword: '',
         newPassword:'',
          confirmPassword: ''
        },
    
        validationSchema: SchemaChangePasswordValidation,
        onSubmit: async (values, { resetForm }) => {
             dispatch(changePassword(values))
        .then((res) => {
            if(res.payload?.success) {
             resetForm();
             setIsSubmit(false);
             navigate('/profile')
             
            }
         })
        
        }
      });


  return (
    <section>
         <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              //toastStyle={{ backgroundColor: "crimson",color:'white' }}
              //theme="colored"
              />
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
      {error && <AlertBanner result={error} isSubmit={isSubmit} setIsSubmit={setIsSubmit} />}

        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Change Your Password
          </h2>
        
          <form onSubmit={formik.handleSubmit} className="mt-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  
                  Enter Old Password
                </label>
                <div className="mt-2 relative pb-4">
                <input
                    className={`flex h-10 w-full rounded-md border ${formik.touched.oldPassword && formik.errors.oldPassword ? 'border-red-300' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="password"
                    placeholder="Old Password"
                    {...formik.getFieldProps("oldPassword")}
                  />
                  {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.oldPassword}</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    Enter New Password
                  </label>
               
                </div>
                <div className="mt-2 relative pb-4">
                <input
                    className={`flex h-10 w-full rounded-md border ${formik.touched.newPassword && formik.errors.newPassword  ? 'border-red-300' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="password"
                    placeholder="New Password"
                    id="password"
                    {...formik.getFieldProps("newPassword")}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.newPassword}</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    Enter Confirm New Password
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
                  Update <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        
        </div>
      </div>
    </section>
  )
}
