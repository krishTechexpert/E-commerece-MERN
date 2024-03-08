import React,{Fragment,useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { useFormik } from "formik";

import {SchemaProfileUpdateValidation} from "../../helper/Validate"
import { useDispatch, useSelector } from 'react-redux';
import {updateProfile,userProfile} from "./userSlice";
import Loader from '../../helper/Loader';
import AlertBanner from '../../helper/AlertBanner';
import imageUpload from "../../helper/imageUpload";
import {sentFormData} from "../../helper/imageUpload";

export default function UpdateProfile() {
    const dispatch = useDispatch();
    const {user,loading,error,isAuthenticated} = useSelector((state) => state.userData)
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '/user.png'); // from public folder
    const[gender,setGender]=useState(user?.gender || '');


    const handleGender = (event) => {
      setGender(event.target.value);
    };

    useEffect(() => {
      if(error){
        setIsSubmit(true)
      }
    },[error])

    const fileUpload = (e) => {
      imageUpload(e, setAvatarPreview)
    }
 
    const formik = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
      gender:gender
    },

    validationSchema: SchemaProfileUpdateValidation,
    onSubmit:  async(values) => {
      const formData = await sentFormData(avatarPreview, values)
  
      await dispatch(updateProfile(formData))
        .then((res) => {
            if(res.payload?.success) {
             navigate('/profile')
            }
         })
    }
  });
  return (<Fragment>
  
             <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
             {error && <AlertBanner result={error} isSubmit={isSubmit} setIsSubmit={setIsSubmit} />}

        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
         
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Update Profile
          </h2>
       
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="mt-8">
            <div>
              <div className='mb-2'>
                <label htmlFor="name" className="text-base font-medium text-gray-900">

                  Full Name
                </label>
                <div className="mt-2 relative pb-4">
                
                  <input
                    className={`flex h-10 w-full rounded-md border ${formik.errors.name ? 'border-red-300' :'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.name}</div>
                  ) : null}
                </div>
              </div>
              <div className='mb-2'>
                <label htmlFor="email" className="text-base font-medium text-gray-900">

                  Email address
                </label>
                <div className="mt-2 relative pb-4">
                  <input
                    className={`flex h-10 w-full rounded-md border ${formik.errors.name ? 'border-red-300' :'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
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


              <div className='mb-2'>
                <label htmlFor="avatar" className="text-base font-medium text-gray-900">

                  Upload profile image
                </label>
                <div className="mt-2 relative pb-4 flex items-center">
                  <figure className='w-10 h-10 mr-3'>
                    <img src={avatarPreview} alt=""/>
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
            
             
              <div>
                {loading && <Loader/>}
                <button
                  type="submit"
                  className="inline-flex w-full mt-5 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white"
                >
                  Update 
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </Fragment>)
}
