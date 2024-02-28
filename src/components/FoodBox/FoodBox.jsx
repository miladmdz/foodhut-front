import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


function FoodBox({ ...items }) {


    const [isLogin,setIsLogin]=useState(false)

    useEffect(()=>{
        let local=JSON.parse(localStorage.getItem("userAccount"))
        if(local){
            setIsLogin(true)
        }else{
            setIsLogin(false)
        }
    },[])


    return (
        <div className='flex flex-col items-center justify-between w-[310px] hover:zoom h-[516px] mb-16 transition-all'>
            {/* part top */}
            {/* image */}
            <a href='#' className='relative w-[253px] h-[253px]'>
                <div className='halfCircle-top dark:halfCircle-top-dark flex items-center absolute right-0 left-0 mx-auto border-[18px] dark:border-[18px] w-[248px] h-[258px]'>
                    <img className='absolute right-0 left-0 mx-auto w-[198px] h-[207px]' src={items.foodImg} alt="" />
                </div>
                <div className='flex items-center justify-center absolute top-44 right-0 left-40 w-[60px] h-[60px] border-[5px] border-white dark:border-primryBlack bg-primryYellow font-sofiaProRegular text-lg text-white dark:text-primryBlack rounded-full'>
                    <p>{items.price}$</p>
                </div>
            </a>
            {/* bottom part */}
            <div className='linearBox dark:linearBox-dark'>
                <div className='relative flex flex-col items-center w-[310px] h-[348px] gap-y-[30px]'>
                    {/* rate */}
                    <div className='flex justify-between items-center mt-16 w-[158px] h-[68px]'>
                        {/* images */}
                        <div className='relative w-[76px] h-[38px]'>
                            <img className='absolute' src={items.rateImg1} alt="" />
                            <img className='absolute left-5' src={items.rateImg2} alt="" />
                            <img className='absolute left-10' src={items.rateImg3} alt="" />
                        </div>
                        {/* icon star */}
                        <div className='h-fit'>
                            <FaStar className='text-primryYellow' />
                        </div>
                        {/* number */}
                        <div>
                            <p className='text-primryBlackLight dark:text-white text-lg font-bold'>({items.rateNum.toFixed(1)})</p>
                        </div>
                    </div>
                    {/* title & description */}
                    <div className='flex flex-col items-center text-center w-[243px] gap-y-4'>
                        <h3 className='text-2xl font-bold text-primryOrang'>{items.name}</h3>
                        <p className='text-base text-primryBlackLight dark:text-white leading-5 line-clamp-3'>{items.desc}</p>
                    </div>
                    {/* buttom */}
                    <div className='absolute -bottom-2.5'>
                        <NavLink to={isLogin ? "/product" :"/login"} state={{...items}} className='py-2.5 px-5 bg-primryOrang hover:bg-primryOrang/80 rounded-full text-sm sm:text-base lg:text-lg text-white dark:text-primryBlack transition-all'>Order Now</NavLink>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodBox