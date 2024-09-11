import React from 'react'
import ProfileCard from '../component/ProfileCard';
import BlogLists from '../component/BlogLists';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { removeUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import RedirectLogIn from '../component/RedirectLogIn';
import Cookies from 'js-cookie';
import useProfileDetails from '../hooks/useProfileDetails';
import Loading from '../shimmer/Loading';


const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((store) => store.user);
  const cookieUser = Cookies.get('user');
  let userData;
  if(cookieUser){
    // navigate("/login");
    userData = JSON.parse(cookieUser);
  }
  const profileDetails = useProfileDetails(userId);
  const handleLogout = async() =>{
    try {
      const url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${url}/auth/logout`,{
        method:'POST',
          headers: {
            "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if(data){
        toast.success("logged out successfully!");
        dispatch(removeUser());
        Cookies.remove('user');
        navigate("/login");
      }
    } catch (error) {
      toast.error("Network Error!");
    }
  }
  return !cookieUser ?(
      <RedirectLogIn />
  ):( !profileDetails ? (
    <div className='absolute w-[100%] min-h-full h-fit flex items-center justify-center flex-col bg-[#252526] -z-10 text-white font-primary'>
      <Loading />
    </div>
  ) :(
    <div className='absolute w-[100%] min-h-full h-fit flex items-center flex-col bg-[#252526] -z-10 text-white font-primary'>
      <div className="flex flex-wrap flex-col md:flex-nowrap justify-center items-center gap-10 mt-32 w-[80%]">
        {
          profileDetails._id === userData._id ? (
            <div className='flex justify-between items-center w-[100%]'>
              <h1 className='text-xl font-bold'>Profile</h1>
              <div className='flex justify-end gap-8'>
              <button className='px-4 py-2 bg-[#624CAB] hover:bg-[#816fbb] rounded-lg ease-linear'>Edit profile</button>
              <button className=' px-4 py-2 bg-[#c23939] hover:bg-[#fc4d4d] rounded-lg ease-linear'
                onClick={handleLogout}
              >log out</button>
              </div>
            </div>
          ) : ("")
        }

      <ProfileCard profile={profileDetails} />
      <div className='flex justify-between items-center w-[100%]'>
      <h1 className='text-xl font-bold'>Your Blogs</h1>
      </div>
      {
        profileDetails.blogs.length === 0 ? 
        (<div>
          <h1>You haven't post Anything</h1>
        </div>) :(
        <BlogLists blogs={profileDetails.blogs} />)
      }
      </div>
    </div>
  )
  )
}

export default Profile; 