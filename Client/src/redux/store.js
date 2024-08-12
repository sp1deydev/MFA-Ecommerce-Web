import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { mfaSlice } from "./mfaSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        mfa: mfaSlice.reducer, //multi factor authentication using graphic password reducer
    },
})

export default store