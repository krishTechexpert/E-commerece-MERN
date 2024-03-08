import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from "./cartSlice";
import { toast } from 'react-toastify';

// here Component refers to ADDToCartButton 
//and product props in <AddToCartFeature product={product} />

const withAddToCartHOC = (Component) => (props) => {
  return <Component {...props} />
}
export default withAddToCartHOC;


export const ADDToCartButton = function ({ product }) {

  const { cartList } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const toastId = React.useRef(null);

  const cartHandler = async (product) => {
    const cartItem = cartList.length > 0 && cartList.find(item => item?._id === product?._id)
    if (cartItem?.stock === 0 && cartItem.stock <= product?.stock) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(`We are sorry! Only ${product.stock} unit(s) available `);
      }
    }
    else {
      await dispatch(AddToCart(product))
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success('Item add to cart');
      }
    }
  }
  return <button
    type="button"
    onClick={() => cartHandler(product)}
    disabled={product.stock <= 0}
    className={`w-1/2 rounded-sm ${product.stock <= 0 ? 'bg-red-600' : 'bg-black'} px-2 py-1.5 text-sm font-semibold text-white shadow-sm`}
  >{product.stock <= 0 ? 'Out Of stock' : 'Add to Cart'}</button>
}

