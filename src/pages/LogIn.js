import React, { useRef, useState } from 'react'
import { backgroundImage } from '../assets';
import { formValidate } from '../utils/FormValidate';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import Header from '../component/Header';
import { CookiesProvider, useCookies } from 'react-cookie'
import Cookies from 'js-cookie';
import Loading from '../shimmer/Loading';
import ButtonLoading from '../shimmer/ButtonLoading';

const LogIn = () => {
  const dispatch = useDispatch();
  const[isLoginForm , setIsLogInForm ] = useState(false);
  const[ showPassword, setShowPassword ] = useState(false);
  const[ errorMessage, setErrorMessage ] = useState(null);
  const[ loading, setLoading ] = useState(false);
  // const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const email = useRef(null);
  const fullname = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const url = process.env.REACT_APP_BASE_URL;
  

  const handleSubmit = async(e) =>{
    setLoading(true);
    e.preventDefault();
    
    const message = formValidate(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return null;

    //* Log in & sign up Logic
    if(!isLoginForm){
      //& sign up Logic
      try {
        toast("Loading..");
        const response = await fetch(`${url}/auth/signup`,{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
      },
        body: JSON.stringify({ email: email.current.value,
          username: username.current.value,
          password: password.current.value,
          fullName: fullname.current.value,
        })
      })
      const data =await response.json();
      if(data?.error)
        toast.error(data.error);
      else{
        toast.success("Signed up successfully");
        dispatch(addUser(data.data));
        Cookies.set('user', JSON.stringify(data.data), { expires: new Date(Date.now() + 3600000) });
        navigate("/");
      }
      } catch (error) {
        toast.error("Something went wrong!!");
        setLoading(false);
      }
    }
    else{
      try {
        const response = await fetch(`${url}/auth/login`,{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
      },
        body: JSON.stringify({ email: email.current.value,
          password: password.current.value,
        })
      })
      const data =await response.json();
      if(data?.error)
        toast.error(data.error);
      else{
        toast.success("Logged In successfully");
        dispatch(addUser(data.data));
        Cookies.set('user', JSON.stringify(data.data), { expires: new Date(Date.now() + 3600000) });
        navigate("/");
      }
      } catch (error) {
        toast.error("Something went wrong!!");
        setLoading(false);
      }
    }
  }
  return (
    <div className='font-primary flex justify-center'>
        <Toaster />
        <Header />
        <div className='h-screen fixed w-full -z-10'>
          <img src={backgroundImage}
          className='brightness-50 object-cover w-full h-full'
          alt="bg-image" />
        </div>
      <form className='absolute mt-32 md:mt-[10%] mx-auto left-0 right-0 flex flex-col w-2/3 md:w-6/12 justify-center rounded-lg items-center text-black bg-gradient-to-r from-slate-300 to-slate-500  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 p-8 md:py-16 md:px-16' onSubmit={(e)=>handleSubmit(e)}>
        <div className='font-bold text-2xl'>INKFROST <span className='font-bold font-third text-2xl'>Blogs</span></div>
        
      <div className='w-full pt-4'>
          {
            !isLoginForm && (
            <div className='flex flex-wrap w-full items-between justify-between md:flex-nowrap gap-4 md:gap-10'>
                <div className='flex  flex-col md:w-1/2 w-full mt-2'>
                      <label>username</label>
                      <input type="text"
                      ref={username}
                      name="name"
                      placeholder='Enter username'
                      className='py-2 px-1 rounded-md mt-1 w-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500' />
                </div>
                <div className='flex flex-col md:w-1/2 w-full mt-2'>
                      <label>Fullname</label>
                      <input type="text" 
                      name='fullName'
                      ref={fullname}
                      placeholder='Enter fullname'
                      className='py-2 px-1 rounded-md mt-1 w-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500' />
                </div>
        </div>
            )
          }
          </div>
        <div className='flex justify-start flex-col w-full mt-2'>
        <label>Email</label>
        <input type="email"
        name='email'
        ref={email}
        placeholder='Enter email'
        className='py-2 px-1 rounded-md w-full mt-1 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500' />
        </div>
        <div className='flex justify-start flex-col w-full mt-2'>
        <label>Password</label>
        <div className='flex justify-end items-center '>
        <input type={ showPassword ? "text" : "password" } 
        ref={password}
        name='password'
        placeholder='Enter password' 
        className='py-2 px-1 rounded-md w-full mt-1 bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500'/>
        <p 
        className='absolute  p-1 px-2 rounded-r-full text-gray-300 cursor-pointer text-sm pr-4 hover:text-purple-500 ease-in'
        onClick={()=> setShowPassword(!showPassword)}>{ !showPassword ? "show" : "hide" }</p>
        </div>
        </div>
        <div className='flex justify-start flex-col w-full mt-2'>
        <p
        onClick={() => setIsLogInForm(!isLoginForm)}
        className='cursor-pointer text-sm'
        >

          {
            isLoginForm ? "Don't Have An Account ? sign up !" : "Already have an Account? , log in !"
          }
          
        </p>
        <p className="text-red-500 font-sm">{errorMessage}</p>
        </div>
        <div className="flex justify-center mt-6 text-white">
          <button className='px-6 py-2 bg-[#624CAB] rounded-lg'>
            {
              loading ? (<div className='flex flex-row gap-4 items-center justify-center'>
                <p>Loading</p>
                <ButtonLoading />
                </div>) : (isLoginForm ? "log in" : "sign up")
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default LogIn;