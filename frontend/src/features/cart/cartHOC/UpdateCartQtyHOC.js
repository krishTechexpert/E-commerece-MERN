import React from 'react';  
import {useDispatch,useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import {updateCart} from "../cartSlice";


const withUpdateCartQtyHOC = (Component) => (props) => {
    return <Component {...props}/>
}
export default withUpdateCartQtyHOC;

export const UpdateCartQtyUI= ({product,cartItemList,action,productDetails}) => {
    const {productList} = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const toastId = React.useRef(null);


    function incrementHandler(id,type){
        const cartItem  = cartItemList.length> 0 && cartItemList.find(item => item?._id === id);

        if(action === 'cart/update'){
          // show taost on details page
          if (cartItem?.stock !== 0) {
            dispatch(updateCart({ id, type }))
            if (!toast.isActive(toastId.current)) {
              toastId.current = toast.success('Item add to cart');
            }
          }
          else {
            if (!toast.isActive(toastId.current)) {
              toastId.current = toast.error(`We are sorry! Only ${productDetails.stock} unit(s) available `);
            }
          }
        }else {
          //here not showing toast in cart page
          if(cartItem && cartItem.stock !==0){
            dispatch(updateCart({id,type}))
          }
        }

         
      }
    
      function decrementHandler(id,type){
        const product = productList.length> 0 && productList.find(item => item?._id === id)
        const cartItem  = cartItemList.length> 0 && cartItemList.find(item => item?._id === id)
         
       if(cartItem?.stock < product?.stock-1){
          dispatch(updateCart({id,type}))
          if (action === 'cart/update' && !toast.isActive(toastId.current)) {
            toastId.current = toast.error('Item Remove from cart');
          }
        }
      }
    
    return (
        <>
                <svg onClick={() => decrementHandler(product._id,'MINUS')} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
    
                <input className="mx-2 border text-center w-8" readOnly type="text" value={product?.totalQty} />
    
                <svg onClick={() => incrementHandler(product._id,'ADD')} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
        </>
      )
}