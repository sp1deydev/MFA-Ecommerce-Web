import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        currentUser: {},
        forgotFactor: '',
        isAuthenticated2FA: false,
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        removeCurrentUser: (state, action) => {
            state.currentUser = {}
        },
        editUser: (state, action) => {
            state.currentUser = action.payload
        },
        setForgotFactor: (state, action) => {
            state.forgotFactor = action.payload
        },
        setIsAuthenticated2FA: (state, action) => {
            state.isAuthenticated2FA = action.payload
        },
    },
})