import React from 'react'
import SubPara from '../component/SubPara';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RedirectLogIn from '../component/RedirectLogIn';
import Cookies from 'js-cookie';
import useBlogDetails from '../hooks/useBlogDetails';
import Loading from '../shimmer/Loading';
import toast from 'react-hot-toast';
import { url } from '../utils/constants';

const BlogPage = () => {
  const user = useSelector((store) => store.user);
  const { blogId } = useParams();
  const navigate = useNavigate();
  const data = useBlogDetails(blogId);
  const cookieUser = Cookies.get('user');
  let userData;
  if(cookieUser)
  userData = JSON.parse(cookieUser);

  const handleDelete = async() =>{
    try {
      const response =await fetch(`${url}/blog/${blogId}`,{
        method:"DELETE"
      });
      const data = await response.json();
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error("try again later!!");
    }
  }
  return !cookieUser ?(
      <RedirectLogIn />
  ):( !data ? (
    <div className='absolute w-[100%] min-h-full h-full flex items-center justify-center flex-col bg-[#252526] -z-10 text-white font-primary'>
      <Loading />
    </div>
  ) :(
    <div className='absolute w-[100%] min-h-full h-fit flex items-center flex-col bg-[#252526] -z-10 text-white font-primary pb-10'>
      <div className='flex justify-end gap-8 w-[80%] mt-32'>
      {
        data.user._id === userData._id ?(
        <button className=' px-4 py-2 bg-[#c23939] hover:bg-[#fc4d4d] rounded-lg ease-linear'
        onClick={handleDelete}
        >Delete</button>
      ) : ""
      }
      </div>
      <div className="flex flex-wrap md:flex-row flex-row-reverse md:flex-nowrap justify-between items-center gap-5 md:gap-10 mt-10 w-[80%]">
        <h1 className='text-2xl font-bold pb-3 md:w-[80%] tracking-wide' >{data.title}</h1>
          <Link to={`/profile/${data.user._id}`}>
        <div className='flex flex-row  justify-start items-center gap-2 md:w-[30%]'>
            <img src={data.user.profilePicture}
            className='w-10 rounded-full'
            alt="profile"/>
            <p>@{data.user.username}</p>
        </div>
          </Link>
      </div>
      <div className="flex flex-col justify-center mt-4  gap-10 w-[80%]" >
            <p className='text-justify tracking-wide'>{data.summary}</p>
            <img src={data.blogPicture} alt="blog-img"/>
      <div className='flex justify-start items-start flex-col gap-10'>
        {
          data.content.map((details) =>(
            <SubPara details ={details} key={details._id}/>
          ))
        }
      </div>
      </div>
    </div>
  )
  )
}

export default BlogPage;