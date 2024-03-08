import { Heart, Trash } from 'lucide-react'
import React from 'react'
import {Link} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { deleteCartItem } from './cartSlice';
import withUpdateCartQtyHOC from "./cartHOC/UpdateCartQtyHOC";
import { UpdateCartQtyUI } from './cartHOC/UpdateCartQtyHOC';

export default function Cart() {
  const { cartList: products,totalAmount } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        {products?.length > 0 ? <>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart({products?.length > 0 ? (products?.length) : ''} { products.length> 1? 'items': 'item' })
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-9">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
              <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
              <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">SubTotal</h3>
            </div>
            {products?.length>0 && products?.map((product) => (

              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={product?._id}>
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img className="h-24" src={product?.images[0]?.url} alt={product?.name} />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <Link to={`/product/${product?._id}`} className="font-bold text-sm">
                      {product?.name}
                    </Link>
                    <div className='flex mt-1'>
                    <span className="text-xs inline-block pr-2 font-semibold">Status: </span>
                    {product?.stock > 0 ? <span className='text-xs text-green-600'>InStock</span> : <span className='text-xs text-red-600'>Out Of Stock</span>}
                    </div>
                    <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0" onClick={() => dispatch(deleteCartItem(product?._id))}>
                      <Trash size={12} className="text-red-500"/>
                      <span className="text-xs font-medium text-red-500">Remove</span>
                    </button>            </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <UpdateCartQtyFeature product={product} cartItemList={products}/>
    
                </div>
                <span className="text-center w-1/5 text-sm text-gray-800"> ₹{product?.price}</span>
                <span className="text-center w-1/5 font-semibold text-sm"> ₹{product?.subTotal}</span>
              </div>
            ))}

          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className=" mt-16 rounded-md bg-white lg:col-span-3 lg:mt-0 lg:p-0"
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Price ({products.length> 0? products.length :''} { products.length> 1? 'items': 'item' })</dt>
                  <dd className="text-sm font-medium text-gray-900">₹ {totalAmount}</dd>
                </div>
             
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900 mx-1">Total Amount: </dt>
                  <dd className="text-base font-medium text-gray-900">₹ {totalAmount}</dd>
                </div>
              </dl>
              
            </div>
          </section>
        </form></> : <p>No item</p> }
      </div>
    </div>
  )
}

const UpdateCartQtyFeature= withUpdateCartQtyHOC(UpdateCartQtyUI)