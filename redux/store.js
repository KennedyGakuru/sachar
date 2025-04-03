import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import favoriteReducer from './favoriteSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorite: favoriteReducer,
    },
});

export default store;