import React from 'react'
import { profilePicture } from '../assets'

const ProfileCard = ({ profile }) => {
  return (
    <div className='flex flex-row flex-wrap md:flex-nowrap justify-center md:justify-between items-center w-[100%] gap-6'>
        <img 
        className='rounded-full'
        src={profile.profilePicture} alt="profile-pic" />
        <div className='flex flex-row justify-between w-[100%]'>
            <div className='mb-4'>
                <h1 className='text-xl font-bold'>{profile.fullName}</h1>
                <h1>@{profile.username}</h1>
            </div>
        <div className='flex flex-col items-center gap-4'>
            <h1 className='text-xl font-bold'>Blogs Contribution</h1>
            <h1 className='text-xl font-bold'>{profile.blogs.length}</h1>
        </div>
        </div>
    </div>
  )
}

export default ProfileCard