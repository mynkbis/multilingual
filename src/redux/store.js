import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import { getDefaultMiddleware } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: {
        user: userReducer,
  
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store;
