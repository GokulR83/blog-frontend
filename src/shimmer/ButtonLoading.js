import React from 'react'

const ButtonLoading = () => {
  return (
    <div className='flex flex-row justify-center gap-2'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-2 w-2 bg-white rounded-full animate-bounce'></div>
    </div>
  )
}

export default ButtonLoading