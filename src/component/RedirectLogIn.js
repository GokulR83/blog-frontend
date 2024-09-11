import React from 'react'
import { Link } from 'react-router-dom'

const RedirectLogIn = () => {
  return (
    <div className='absolute w-[100%]  h-full flex justify-center items-center flex-col bg-[#252526] -z-10 text-white font-primary gap-5'>
        <h1 className='text-4xl font-bold'>Access Blocked!!</h1>
        <h1>Log In to Access the Content</h1>
        <Link to={"/login"}>
        <button className='px-4 py-2 bg-[#624CAB] hover:bg-[#816fbb] rounded-lg ease-linear'>Click to Log In</button>
        </Link>
    </div>
  )
}

export default RedirectLogIn;