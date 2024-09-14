import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { mfaSlice } from "./mfaSlice";
import { productSlice } from "./productSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        product: productSlice.reducer,
        mfa: mfaSlice.reducer, //multi factor authentication using graphic password reducer
    },
})

export default store