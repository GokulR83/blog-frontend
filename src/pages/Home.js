import { useDispatch, useSelector } from "react-redux";
import BlogLists from "../component/BlogLists";
import RedirectLogIn from "../component/RedirectLogIn";
import useGetAllBlogs from "../hooks/useGetAllBlogs";
import Cookies from 'js-cookie';
import Loading from "../shimmer/Loading";
import { useEffect, useState } from "react";
import { addBlog } from "../store/blogSlice";

const Home = () => {
  const url = process.env.REACT_APP_BASE_URL;
  const [sort , setSort ] = useState(false);
  const [blogs, setBlogs ] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const blog = useGetAllBlogs(url);
  useEffect(()=>{
    setBlogs(blog);
  },[blog])
  const cookieUser = Cookies.get('user');
  const handleSort = () =>{
    setSort(!sort);
    console.log(blogs);
    const arrayForSort = [...blogs];
    arrayForSort.reverse();
    // blogs = arrayForSort;
    // console.log(blogs);
    setBlogs(arrayForSort);
  }
  
  return !cookieUser ?(
      <RedirectLogIn />
  ):( !blogs ? (
    <div className='absolute w-[100%] min-h-full h-fit flex items-center justify-center flex-col bg-[#252526] -z-10 text-white font-primary'>
      <Loading />
    </div>
  ) :(
    <div className='absolute w-[100%] min-h-full h-fit flex items-center flex-col bg-[#252526] -z-10 text-white font-primary'>   
      <div className="flex justify-between items-center mt-32 md:w-[70%] w-[100%]">
        <h1
        className="font-bold font-primary text-2xl pl-6" 
        >All Blogs</h1>
        <button className="px-6 py-2 bg-[#624CAB] hover:bg-[#6b5c9c] rounded-lg mr-6"
        onClick={handleSort}
        >
          {
            sort ? "sort by oldest" : "sort by latest"  
          }
          </button>
      </div>
      <div className="flex justify-between items-center mt-10 w-[70%]">
      <BlogLists blogs= {blogs} />
      </div>
    </div>
  )
  )
}

export default Home;