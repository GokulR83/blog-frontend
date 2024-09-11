import React from 'react'
import { backgroundImage } from '../assets';
import { Link } from 'react-router-dom';
import RedirectLogIn from '../component/RedirectLogIn';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const ErrorPage = () => {
  const user = useSelector((store) => store.user);
  const cookieUser = Cookies.get('user');
  return !cookieUser ?(
      <RedirectLogIn />
  ):(
    <div className='bg-[#252526] w-full h-screen flex items-center justify-center flex-col font-primary text-white'>
      <h1 className='text-8xl font-secondary font-bold mt-8'>404</h1>
      <p className='text-lg font-secondary mt-4'>OOPS, It's Just an Error Page ..!!</p>
      <p className='text-lg mt-2'>What you're looking for may have been misplaced in Long term Memory !</p>
      <Link to="/">
      <button className='bg-purple-600 px-4 py-2 rounded-lg mt-8'>Back To Homepage</button>
      </Link>
    </div>
  )
}

export default ErrorPage;