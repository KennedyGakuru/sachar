import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingAddress: null,
};
const checkoutSlice = createSlice({
    name:'checkout',
    initialState,
    reducers:{
        setShippingAddress: (state,action) =>{
            state.shippingAddress = action.payload;
        },
    },
});

export const {setShippingAddress} = checkoutSlice.actions;
export default checkoutSlice.reducer;