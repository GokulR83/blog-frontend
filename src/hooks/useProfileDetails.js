import { useEffect, useState } from "react";
import { url } from "../utils/constants";

const useProfileDetails = (userId) =>{
    const[ profile, setProfile ] = useState(null);
    useEffect(()=>{
        getAllBlogs();
    },[]);
    const getAllBlogs = async() =>{
        const response = await fetch(`${url}/user/${userId}`,{
            method:'GET',
        });
        const data = await response.json();
        setProfile(data);
    }
    return profile;
};

export default useProfileDetails;