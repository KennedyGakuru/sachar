import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart: (state,action) => {
            const product = action.payload;
            const existingProduct = state.cartItems.find(item => item.id === product.id);

            if (existingProduct){
                existingProduct.quantity += 1;
            } else {
                state.cartItems.push({...product,quantity: 1});
            }
        },
        removeFromCart : (state, action) =>{
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        clearFromCart : (state) => {
            state.items =[];
        },
        updatedQuantity : (state,action) => {
            const {id,quantity} = action.payload;
            const product = state.cartItems.find(item => item.id === id);
            if (product && quantity> 0){
                product.quantity = quantity;
            }
        }
    }
});

export const { addToCart, removeFromCart, clearFromCart, updatedQuantity} = cartSlice.actions;
export default cartSlice.reducer;