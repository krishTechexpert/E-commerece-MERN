import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useFormik } from "formik";
import { SchemaRegisterValidation } from "../../helper/Validate"
import Loader from '../../helper/Loader';
import { signUp } from "./userSlice";
import { useDispatch, useSelector } from 'react-redux';
import AlertBanner from '../../helper/AlertBanner';
import { Link, useNavigate } from 'react-router-dom';
import imageUpload from "../../helper/imageUpload";
import {sentFormData} from "../../helper/imageUpload";
import { Lock,Unlock } from 'lucide-react';


export default function Register() {
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const [open,setOpen]=useState(false);
  const[gender,setGender]=useState('');
  const { loading, error } = useSelector((state) => state.userData)
  const [avatarPreview, setAvatarPreview] = useState('/user.png'); // from public folder

  const handleGender = (event) => {
    setGender(event.target.value);
  };
  const fileUpload = (e) => {
    imageUpload(e, setAvatarPreview)
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: '',
      password: '',
      confirmPassword: '',
      gender:'',
      acceptConditions:false
    },

    validationSchema: SchemaRegisterValidation,
    onSubmit: async (values, { resetForm }) => {

      const { confirmPassword, ...user } = values; // confirm password don't want to save in db 
      const formData = await sentFormData(avatarPreview, user)

      await dispatch(signUp(formData))

        .then((res) => {
          if (res.error) {
            setIsSubmit(true)
          }

          if (res?.payload?.success) {
            resetForm()
            setIsSubmit(false)
            navigate('/profile')

          }
        })
      // http.post(appConfigApi.register,user)
      // .then(response => {
      //   console.log(response)
      //   navigate('/profile')
      //   toast.success(response.data.message)
      //   formik.resetForm();
      // })
      // .catch(error => {
      //   if(error.response){
      //     // to prevent duplicate toast
      //     if(! toast.isActive(toastId.current)) {
      //       toastId.current = toast.error(error.response.data.error);
      //     }
      //   }
      // })
    }
  });
  return (
    <section>
      {error && <AlertBanner result={error} isSubmit={isSubmit} setIsSubmit={setIsSubmit} />}
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account? 
            <Link to='/login' className="px-1 font-semibold text-black transition-all duration-200 hover:underline">Sign In</Link>

          </p>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="mt-8">
            <div>
              <div className='mb-2'>
                <label  className="text-base font-medium text-gray-900">

                  Full Name
                </label>
                <div className="mt-2 relative pb-4">
                  <input
                    className={`flex h-10 w-full rounded-md border ${formik.touched.name && formik.errors.name ? 'border-red-300' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="text"
                    placeholder="Full Name"
                    //id="name"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.name}</div>
                  ) : null}
                </div>
              </div>
              <div className='mb-2'>
                <label  className="text-base font-medium text-gray-900">

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
              <div className='mb-2'>

                <label className="text-base font-medium text-gray-900">

                  Password
                </label>

                <div className="mt-2 relative pb-4">
                  <input
                    className={`flex h-10 w-full rounded-md border ${formik.touched.password && formik.errors.password ? 'border-red-300' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="password"
                    placeholder="Password"
                    id="password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className='mb-2'>

                <label className="text-base font-medium text-gray-900">

                  Confirm Password
                </label>

                <div className="mt-2 relative pb-4">
                <div className='absolute right-3 top-2 cursor-pointer' onClick={() => setOpen(!open)}>
                    {open ? <Unlock  /> : <Lock />  }
                    </div>
                  <input
                    className={`flex h-10 w-full rounded-md border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type={open ? "text" : "password"}
                    placeholder="Confirm Password"
                    id="confirmpassword"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
              </div>
              <div className='mb-2'>
                <label className="text-base font-medium text-gray-900">

                  Gender
                </label>
                <div className="mt-2 relative pb-4">
                  <select onChange={handleGender} value={gender}
                    className={`flex h-10 w-full rounded-md border ${formik.touched.gender && formik.errors.gender ? 'border-red-300' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    {...formik.getFieldProps("gender")}
                  >
                    <option value=''>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.gender}</div>
                  ) : null}
                </div>
              </div>  
              <div className='mb-2'>
                <label className="text-base font-medium text-gray-900">

                  Upload profile image
                </label>
                <div className="mt-2 relative pb-4 flex items-center">
                  <figure className='w-10 h-10 mr-3'>
                    <img src={avatarPreview} alt="" />
                  </figure>
                  <div className='relative flex-1 h-10'>
                   <div className='bg-teal-50 absolute left-0 top-0 w-full h-full z-0 px-1  bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase flex justify-center items-center'>
                   <input type="file" name="avatar"
                    accept='image/*'
                    onChange={fileUpload}
                    className='opacity-0 absolute left-0 top-0 w-full h-full z-10 cursor-pointer'
                  />Upload Photo
                  </div> 
                  </div>
                  

                </div>
              </div>
              <div className='mb-2'>
                <div className="mt-2 relative pb-4">
                  <div className="flex items-center">
                    <input id="link-checkbox" type="checkbox" {...formik.getFieldProps('acceptConditions')}  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
                </div>
               
                  {formik.touched.acceptConditions && formik.errors.acceptConditions ? (
                    <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.acceptConditions}</div>
                  ) : null}
                </div>
              </div>
              <div>
                {loading && <Loader />}
                <button
                  type="submit"
                  className="inline-flex w-full mt-5 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </section>
  )
}
