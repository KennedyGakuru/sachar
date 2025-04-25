import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import favoriteReducer from './favoriteSlice'
import checkoutReducer from './checkoutSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorite: favoriteReducer,
        checkout: checkoutReducer,
    },
});

export default store;