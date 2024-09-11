import { createSlice } from "@reduxjs/toolkit";


const blogSlice = createSlice({
    name:"blog",
    initialState:{
        allBlogs: null,
    },
    reducers:{
        addBlog:(state,action) =>{
            state.allBlogs = action.payload;
        }
    }
})

export const { addBlog } = blogSlice.actions;

export default blogSlice.reducer;