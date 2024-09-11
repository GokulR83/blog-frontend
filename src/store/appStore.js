import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import blogReducer from "./blogSlice";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        blogs: blogReducer,
    }
})

export default appStore;