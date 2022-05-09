import { createSlice } from "@reduxjs/toolkit";

export const contractSlice = createSlice({
    name: 'contract',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: state => {
            state.value += 1
          }, 
    }
}); 

export const { increment } = contractSlice.actions;

export default contractSlice.reducer;