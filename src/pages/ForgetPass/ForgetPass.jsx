import React, { useContext, useState } from 'react'
import restaurantCotext from '../../context/contextData';

function ForgetPass() {

  let contextData = useContext(restaurantCotext)


  return (
    <div className='w-[90%] h-screen md:h-[80.5vh] mx-auto mt-20' data-aos="flip-left" data-aos-duration="600">
        <div className='flex items-center justify-center w-full h-full mt-10'>
        
          <div className='flex flex-col items-center w-[80%] lg:w-[50%] h-[80%] md:h-full'>
            <div className='flex flex-col items-center justify-between w-full h-[120px]'>
              <h2 className='text-2xl sm:text-5xl font-bold w-full h-fit text-center dark:text-white'>Recovery Password</h2>
              <p className='text-sm sm:text-lg text-gray-500 w-full h-fit text-center'>Please,Enter youre details to Recovery</p>
            </div>
            <form action="" className='flex flex-col items-center justify-around w-full h-[60%]'>
              <div className='w-[80%] lg:w-[50%] border-b-[1px] border-gray-300'>
                <label htmlFor="email" className='text-gray-500 text-xs sm:text-sm'>YOURE EMAIL</label>
                <input id='email' className='w-full h-16 text-sm xs:text-xl outline-none bg-transparent placeholder:text-black/80 placeholder:dark:text-white' type="text" placeholder='Enter youre Email Address' />
              </div>
              <div className='w-[80%] lg:w-[50%]'>
                  <a href='#' className='flex justify-center w-full bg-primryOrang text-white dark:text-primryBlackLight text-xl py-4 rounded-xl hover:w-[104%] hover:opacity-85 transition-all'>Recovery</a>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default ForgetPass