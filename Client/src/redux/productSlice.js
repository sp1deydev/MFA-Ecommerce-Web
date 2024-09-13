import { createSlice } from "@reduxjs/toolkit";

export const products = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        productList: [],
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setProductList: (state, action) => {
            state.productList = action.payload
        },
    },
})