import React, { useEffect, useState } from 'react'
import { Star, ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';

import MetaData from '../../components/layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../features/products/productSlice';
import Loader from '../../helper/Loader';
import { ToastContainer, toast } from 'react-toastify';
import ReactStars from 'react-stars'
import Reviews from "./Reviews";
import { updateCart } from '../cart/cartSlice';
import { ADDToCartButton } from '../cart/AddToCartHOC';
import withAddToCartHOC from '../cart/AddToCartHOC';
import withUpdateCartQtyHOC from "../cart/cartHOC/UpdateCartQtyHOC";
import { UpdateCartQtyUI } from '../cart/cartHOC/UpdateCartQtyHOC';

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, loading, error } = useSelector((state) => state.products)
  const { cartList } = useSelector((state) => state.cart)
  const toastId = React.useRef(null);


  useEffect(() => {
    dispatch(getProductDetails(id))
    if (error) {
      toast.error(error, {
        autoClose: 5000
      });
    }
  }, [id, error])

  const options = {
    edit: false,
    color: "rgba(20,20,20,.1)",
    activeColor: "yellow",
    value: singleProduct?.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true
  }

  // check already product exits if no then show ADD to cart button 
  const cartProduct = cartList.find(item => item._id === singleProduct?._id)
  
  return (

    <section className="overflow-hidden">
      {loading && <div className='my-20 py-20'><Loader /></div>}
      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover

      />
      {singleProduct &&
        <div className="mx-auto max-w-5xl px-5 py-12">
          <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
            <img
              alt="Nike Air Max 21A"
              className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
              src={singleProduct?.images[0]?.url}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
              <h2 className="text-sm font-semibold tracking-widest text-gray-500">{singleProduct?.category}</h2>
              <h1 className="my-4 text-3xl font-semibold text-black">{singleProduct?.name}</h1>
              <div className="my-4 flex items-center">
                <span className="flex items-center space-x-1">
                  <ReactStars {...options} />
                  <span className="ml-3 inline-block text-xs font-semibold">{singleProduct?.numOfReviews} Reviews</span>
                </span>
              </div>
              <p className="leading-relaxed">
                {singleProduct?.description}
              </p>
              <p className="title-font mt-3 text-xl font-bold text-gray-900 py-3 border-b border-gray-300">₹{singleProduct?.price}</p>
              <ul className="space-y-5 pb-5 mt-5 mb-5 text-sm  border-b border-gray-300">
                <li>
                  <span className="text-heading inline-block pr-2 font-semibold">Status: </span>
                  {cartProduct?.stock !== 0 && singleProduct.stock !== 0 ? <span className='text-green-600'>InStock</span> : <span className='text-red-600'>Out Of Stock</span>}
                </li>
              </ul>
              {typeof (cartProduct) === 'object' ?

                <div className="space-s-4 mt-3  3xl:pr-48 flex relative items-center gap-2  py-8  md:pr-32 lg:pr-12 2xl:pr-32">
                  <p className="text-sm mr-2 absolute top-2 left-0 font-bold text-gray-900">Add To Cart</p>

                  <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                    
                  <UpdateCartQtyFeature product={cartProduct} cartItemList={cartList} productDetails={singleProduct}  action='cart/update' />
                 
                  </div>

                </div>
                :
                singleProduct?.stock !== 0 &&
                <div className=' mb-5 flex flex-col'>
                  <AddToCartFeature product={singleProduct}  />

                </div>
              }
              <button
                type="button"
                className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Submit Review
              </button>

            </div>
          </div>
          <div className="">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 mt-10 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Customer Reviews
              </h2>
            </header>
            {singleProduct?.reviews && singleProduct.reviews[0] ?
              singleProduct?.reviews.map((review) => {
                return <Reviews key={review._id} review={review} />
              })
              : <p className="truncate text-base font-semibold text-gray-800">No Review yet</p>
            }
          </div>


        </div>}
    </section>
  )
}


export default ProductDetails;

const AddToCartFeature = withAddToCartHOC(ADDToCartButton);
const UpdateCartQtyFeature= withUpdateCartQtyHOC(UpdateCartQtyUI);
