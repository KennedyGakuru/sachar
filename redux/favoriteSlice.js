import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers:{
        addToFavorites:(state,action) => {
            
            state.items.push(action.payload);
        },
        removeFromFavorites:(state,action) => {
            state.items = state.items.filter(item=> item.id !== action.payload.id)
        }
    }
});

export const {addToFavorites, removeFromFavorites} = favoriteSlice.actions;
export default favoriteSlice.reducer;

