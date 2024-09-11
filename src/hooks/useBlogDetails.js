import { useEffect, useState } from "react";
import { url } from "../utils/constants";


const useBlogDetails = (blogId) =>{
    const[blog, setBlog ] = useState(null);
    useEffect(()=>{
        getBlogDetails();
    },[]);
    const getBlogDetails = async() =>{
        const response = await fetch(`${url}/blog/${blogId}`,{
            method:'GET',
        });
        const data = await response.json();
        setBlog(data);
    }
    return blog;
}
export default useBlogDetails;