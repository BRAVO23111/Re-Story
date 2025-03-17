import {configureStore , combineReducers} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js'
import cartReducer from './slices/cartSlice.js'

const rootreducer = combineReducers({
    auth : authReducer,
    cart : cartReducer
})

const store = configureStore({
    reducer : rootreducer
});

export default store;   