import { configureStore,combineReducers } from '@reduxjs/toolkit';
import productReducer from "./features/products/productSlice";
import userReducer from "./features/user/userSlice";
import cartReducer from './features/cart/cartSlice';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
//import storageSession from 'redux-persist/es/storage/session'
import storage from 'redux-persist/lib/storage'


const persistConfig= {
    key:'root',
    //storage: storageSession,
    storage
}

const rootReducer=combineReducers({
    products:productReducer,
    userData:userReducer,
    cart:cartReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware: [thunk]
})



export default store;

//we also included the Thunk middleware, which will intercept and 
//stop non-serializable values in action before they get to the reducer. 
//When using Redux Persist without using the Thunk middleware, 
//we‘d get an error in the browser’s console reading a non-serializable value was 
//detected in the state.