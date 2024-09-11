import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../store/blogSlice";

const useGetAllBlogs = (url) =>{
    const[ blog, setBlog ] = useState(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        getAllBlogs();
    },[]);
    const getAllBlogs = async() =>{
        const response = await fetch(`${url}/blog/`,{
            method:'GET',
        });
        const data = await response.json();
        setBlog(data.posts);
        dispatch(addBlog(data.posts));
    }
    return blog;
};

export default useGetAllBlogs;