import React from 'react'

const SubPara = ({ details }) => {
  return (
    <div className='text-justify flex justify-start flex-col'>
        <h2 className='text-xl font-bold my-2 tracking-wide'>{details.subheading}</h2>
        <p className='indent-8 tracking-wide'>{details.content}</p>
    </div>
  )
}

export default SubPara;