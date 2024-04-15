import {configureStore} from "@reduxjs/toolkit"
import authSliceReducer from "./features/authSlice"

export const store = configureStore({
    reducer: authSliceReducer
});