import React from 'react'
import { backgroundImage } from '../assets';
import Loading from '../shimmer/Loading';

const BlogComponent = ({blog}) => {
  // console.log(blog);
  return (
    !blog ? <Loading/> :(
    <div className='flex justify-center text-justify items-center w-full flex-wrap md:flex-nowrap  rounded-lg  gap-3  hover:shadow-xl hover:shadow-gray-700 bg-[#1c1c1d] cursor-pointer'>
        <div className='md:w-1/2'>
            <img src={blog.blogPicture}
            className=' bg-cover object-cover w-fit rounded-t-lg md:rounded-lg aspect-video'
            alt="blog-image" />
        </div>
        <div className='md:m-4 m-2 md:w-1/2'>
            <h1 className='text-xl font-bold pb-3' >
              {blog.title}
            </h1>
            <p className='pr-2 overflow-hidden text-ellipsis max-h-36 tracking-wide'>{blog.summary}</p>
            <p className='pr-2 overflow-hidden text-ellipsis max-h-36 tracking-wide'>Read More . . .</p>
        </div>
    </div>
    )
  )
}

export default BlogComponent;