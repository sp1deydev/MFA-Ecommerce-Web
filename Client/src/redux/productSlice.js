import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        productList: [
            {
                id: 1,
                name: 'Smart Tivi Samsung',
                price: 8170000,
                quatity: 10,
                image: 'https://shopdunk.com/images/thumbs/0000569_alpine-green.webp',
                description: 'test description'
              },
              {
                id: 2,
                name: 'Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU7002 2',
                price: 8170000,
                quatity: 10,
                image: 'https://shopdunk.com/images/thumbs/0000569_alpine-green.webp',
                description: 'test description'
              },
              {
                id: 3,
                name: 'Samsung Galaxy S24 Ultra 5G 256GB',
                price: 8170000,
                quatity: 10,
                image: 'https://shopdunk.com/images/thumbs/0000569_alpine-green.webp',
                description: 'test description'
              },
              {
                id: 4,
                name: 'Smart Tivi Samsung Crystal UHD 4K 55 inch UA55AU7002 4',
                price: 8170000,
                quatity: 10,
                image: 'https://shopdunk.com/images/thumbs/0000569_alpine-green.webp',
                description: 'test description'
              },
              {
                id: 5,
                name: 'Smart Tivi Samsung Crystal UHD 4K 55 inch  5',
                price: 8170000,
                quatity: 10,
                image: 'https://shopdunk.com/images/thumbs/0000569_alpine-green.webp',
                description: 'test description'
              },
              {
                id: 6,
                name: 'Smart Tivi Samsung Crystal UHD 4K 55 inch  5',
                price: 8170000,
                quatity: 10,
                image: 'https://shopdunk.com/images/thumbs/0000569_alpine-green.webp',
                description: 'test description'
              },
              {
                id: 7,
                name: 'Smart Tivi Samsung Crystal UHD 4K 55 inch  5',
                price: 8170000,
                quatity: 10,
                image: 'https://shopdunk.com/images/thumbs/0000569_alpine-green.webp',
                description: 'test description'
              },
        ],
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