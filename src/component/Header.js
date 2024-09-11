import React, { useState } from 'react'
import { logo, profilePicture, search } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const Header = () => {
  const[searchQuery, setSearchQuery ] = useState("");
  const navigate = useNavigate();
  const user = useSelector((store)=> store.user);
  const cookieUser = Cookies.get('user');
  let userData;
  if(cookieUser)
  userData = JSON.parse(cookieUser);
  return (
    <div className='fixed w-full h-20 bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md opacity-100 flex  justify-between text-white font-primary'>
      <img
      className='cursor-pointer'
      src={logo} 
      alt="logo"
      onClick={()=> navigate("/")}
      />
      {
        !cookieUser ? (<div className='flex justify-end items-center w-1/2 mr-5'>
          <Link to={"/login"}>
          <button className='px-4 py-2 bg-[#624CAB] hover:bg-[#816fbb] rounded-lg ease-linear'>Log In / Sign up</button>
          </Link>
        </div>) :(
            <div className='flex justify-end gap-16 items-center w-1/2 mr-6'>   
        {/* <input type="text" name="search" placeholder="search" className='pl-3 py-1 w-2/4 rounded-full bg-gray-300  focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="absolute  p-1 px-2 rounded-r-full">
          <img 
          className="w-5 h-5"
          src={search} alt = "icon" />
        </button> */}
        <Link to={"/"}>
        <p className='cursor-pointer hover:text-purple-500 ease-in-out'>Blogs</p>
        </Link>
        <Link to={`/create/${userData._id}`}>
        <p className='cursor-pointer hover:text-purple-500 ease-in-out'>Write</p>
        </Link>
        <Link to={`/profile/${userData._id}`}>
        <img src={userData?.profilePicture} alt="profile" className='w-10 rounded-full cursor-pointer' />
        </Link>
      </div>
        )
      }
      
    </div>
  )
}

export default Header;