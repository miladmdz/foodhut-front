import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';
import { IoIosPerson } from "react-icons/io";

function Dashboard() {

  const [resultData, setResultData] = useOutletContext()


  return (
    <>
    {resultData ? (

    <div className='w-[90%] h-full mx-auto'>
      <div className=' flex flex-col w-[200px] h-[200px] xs:w-[300px] xs:h-[300px] lg:w-[500px] lg:h-[500px] dark:text-white text-primryBlack bg-white/90 dark:bg-black/10 shadow-shadowPrimary rounded-3xl'>
        {/* top part */}
        <div className='flex flex-col justify-between w-full h-[50%]'>
          <IoIosPerson className='w-full h-full' />

        </div>
        {/* bottom part */}
        <div className='flex flex-col justify-around w-full h-[50%]'>
          <div className='flex w-[80%] items-center justify-between text-xs xs:text-base lg:text-xl font-sofiaPro border-b-[1px] hover:text-primryOrang border-gray-400 mx-auto transition-all cursor-pointer xs:mt-10'>
            <div className='text-sm xs:text-lg lg:text-2xl font-bold'>Name:</div>
            <div className='flex items-start w-[50%]'>{resultData.name}</div>
          </div>
          <div className='flex w-[80%] items-center justify-between text-xs xs:text-base lg:text-xl font-sofiaPro border-b-[1px] hover:text-primryOrang border-gray-400 mx-auto transition-all cursor-pointer'>
            <div className='text-sm xs:text-lg lg:text-2xl font-bold'>Email:</div>
            <div className='flex items-start w-[50%]'>{resultData.email}</div>
          </div>
          <div className='flex w-[80%] items-center justify-between text-xs xs:text-base lg:text-xl font-sofiaPro border-b-[1px] hover:text-primryOrang border-gray-400 mx-auto transition-all cursor-pointer'>
            <div className='text-sm xs:text-lg lg:text-2xl font-bold'>Password:</div>
            <div className='flex items-start w-[50%]'>{resultData.password}</div>
          </div>
          <div className='flex w-[80%] items-center justify-between text-xs xs:text-base lg:text-xl font-sofiaPro border-b-[1px] hover:text-primryOrang border-gray-400 mx-auto transition-all cursor-pointer'>
            <div className='text-sm xs:text-lg lg:text-2xl font-bold'>Address:</div>
            <div className='flex items-start w-[50%]'>{resultData.address}</div>
          </div>
        </div>
      </div>
    </div>
    ) : (
      <div className='w-[90%] h-full mx-auto'>
        <div className='flex items-center justify-center fade w-full h-full text-primryOrang text-2xl font-bold'>
          check youre connection(vpn)...
        </div>
      </div>
    )}
    </>
  )
}

export default Dashboard