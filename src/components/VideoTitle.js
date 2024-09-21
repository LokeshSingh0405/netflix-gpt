import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black '>
         <h1 className="text-6xl font-bold">{title}</h1>
         <p className='py-6 text-lg w-1/4'>{overview}</p> 
         <div className=''>
            <button className='bg-white text-black p-4 text-xl rounded-lg px-12 hover:bg-opacity-80'>▷ Play</button>
            <button className='bg-gray-500 text-white p-4 text-xl bg-opacity-50 hover:bg-opacity-80 rounded-lg px-12 mx-2'>More Info</button>
         </div>
    </div>
  )
}

export default VideoTitle