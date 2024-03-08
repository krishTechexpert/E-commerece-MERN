import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    cartList: [],
    totalAmount: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        AddToCart(state, action) {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            const isItemExist = state.cartList.length > 0 && state.cartList.find((item) => item?._id === action.payload?._id);
            if (isItemExist) {
                if (isItemExist.stock !== 0) {
                    isItemExist.stock--;
                    isItemExist.subTotal += action.payload.price;
                    isItemExist.totalQty++;
                }
                const index = state.cartList.findIndex((item) => item?._id === action.payload?._id)
                state.cartList[index] = isItemExist
            }
            else {
                let product = { ...action.payload }
                product.subTotal = product.price;
                product.totalQty = 1;
                product.stock = product.stock - 1;
                state.cartList = [...state.cartList, product];
            }
            if (state.cartList.length > 0) {
                state.totalAmount = state.cartList.map(item => item?.subTotal).reduce((sum, val) => sum + val, 0)
            }
        },
        updateCart(state, action) {
            const product = state.cartList.find(item => item._id === action.payload.id)

            if (action.payload.type === 'ADD') {
                product.totalQty++;
                product.stock--;
                product.subTotal = product.subTotal + product.price;

            }

            if (action.payload.type === 'MINUS') {
                product.totalQty--;
                product.stock++;
                product.subTotal = product.subTotal - product.price;
            }

            const index = state.cartList.findIndex((item) => item?._id === action.payload.id)
            state.cartList[index] = product;
            state.totalAmount = state.cartList.map(item => item?.subTotal).reduce((sum, val) => sum + val, 0)



        },
        deleteCartItem(state,action){
            const product = state.cartList.find((item) => item._id === action.payload)
            state.totalAmount = state.totalAmount - (product?.price * product?.totalQty)
            state.cartList = state.cartList.filter(item => item._id !== action.payload)
        }
    }
})
export const { AddToCart, updateCart,deleteCartItem } = cartSlice.actions;
export default cartSlice.reducer;

