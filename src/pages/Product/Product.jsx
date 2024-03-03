import React, { useEffect, useState } from 'react'
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css"
import apiRequest from '../../Services/Axios/config';
import axios from 'axios';


function Product() {

    let location = useLocation().state

    const [inputValue, setInputValue] = useState(0)
    const [price, setPrice] = useState(0)
    const [userData, setUserData] = useState()
    const [duplicate, setDuplicate] = useState([])
    const [test, setTest] = useState([])

    let local = null


    const minusHandler = () => {
        setInputValue(prevState => {
            if (inputValue > 0) {
                return prevState - 1
            } else {
                return 0
            }
        })
        if (userData) {
            if (userData.products) {
                setDuplicate(userData.products.filter((item, index) => location.name === item.name))
            }
        }
    }

    const plusHandler = () => {
        setInputValue(prevState => prevState + 1)
        if (userData) {
            if (userData.products) {
                setDuplicate(userData.products.filter((item, index) => location.name === item.name))
            }
        }
       
    }

    useEffect(() => {

        if (duplicate.length > 0) {
            if (userData) {
                if (userData.products) {
                    setDuplicate(prevState => prevState[0].num = inputValue)
                    let other = userData.products.filter(item => item.name !== location.name)
                    setTest([...other, ...duplicate]);
                }
            }
        }
        else {
            if (userData) {
                if (userData.products) {

                    setTest([
                        ...userData.products,
                        {
                            id: userData.products.length + 1,
                            foodImg: location.foodImg,
                            reteNum: location.rateNum,
                            name: location.name,
                            price: location.price,
                            num: inputValue,
                        }
                    ]);
                }
            }
        }

    }, [inputValue])

    const buyHandler = () => {
        axios.put(`https://foodhut-server.liara.run/users/${userData.id}`,{
            ...userData,
            products:test
        }).then(res=>console.log(res))
        .catch(error=>console.log(`Error: ${error}`))
    }

    useEffect(() => {
        Aos.init()
        local = JSON.parse(localStorage.getItem("userAccount"))
        axios.get("https://foodhut-server.liara.run/users")
            .then(res => setUserData(...res.data.filter(item => item.id===local.id)))
    }, [])

    useEffect(() => {
        setPrice(inputValue * location.price)
    }, [inputValue])

    return (
        <div className='w-[90%] h-screen darck:headerbgc dark:text-white mx-auto'>
            <div className='flex flex-col items-center justify-center w-[250px] h-[60%] sm:w-[350px] sm:h-[60%] shadow-shadowPrimary bg-white/90 dark:bg-black/10 mt-40 md:mt-20 mx-auto rounded-3xl' data-aos="flip-up">
                <div className='flex flex-col items-center justify-around w-full h-full font-sofiaPro'>
                    {/* img */}
                    <div className='relative flex items-center justify-center w-[150px] h-[200px] sm:w-full sm:h-[265px]'>
                        <div className='absolute top-1 sm:top-3 dark:halfCircle-top-dark halfCircle-top dark:border-[15px] border-[15px] w-[190px] h-[180px] sm:w-[240px] sm:h-[240px] z-0'>
                        </div>
                        <img className='z-10' src={location.foodImg} alt="" />
                    </div>
                    {/* text */}
                    <div className='flex flex-col justify-between w-[80%] h-[120px]'>
                        <div className='flex items-center gap-x-4 w-full h-[20%] border-b-[1px] border-gray-500 rounded-full hover:border-primryOrang hover:text-primryOrang cursor-pointer transition-all'>
                            <p className='text-xl font-semibold ml-2'>Rate:</p>
                            <p className='font-semibold'>{location.rateNum}</p>
                        </div>
                        <div className='flex items-center gap-x-4 w-full h-[20%] border-b-[1px] border-gray-500 rounded-full hover:border-primryOrang hover:text-primryOrang cursor-pointer transition-all'>
                            <p className='text-xl font-semibold ml-2'>Name:</p>
                            <p className='font-semibold'>{location.name}</p>
                        </div>
                        <div className='flex items-center gap-x-4 w-full h-[20%] border-b-[1px] border-gray-500 rounded-full hover:border-primryOrang hover:text-primryOrang cursor-pointer transition-all'>
                            <p className='text-xl font-semibold ml-2'>Price:</p>
                            <p className='font-semibold'>{location.price}</p>
                        </div>
                    </div>
                    {/* btn */}
                    <div className='flex items-center justify-around w-full h-[50px]'>
                        {/* counter */}
                        <div className='flex items-center justify-evenly border-[1px] border-gray-600 rounded-lg'>
                            <div onClick={plusHandler} className='py-2 px-2 cursor-pointer text-xl text-primryOrang'>+</div>
                            <div>{inputValue}</div>
                            <div onClick={minusHandler} className='py-2 px-2 cursor-pointer text-xl text-primryOrang'>-</div>
                        </div>
                        {/* buy btn */}
                        <div>
                            <NavLink to={"/"} onClick={buyHandler} className='py-2 px-8 bg-primryOrang hover:bg-primryOrang/80 dark:text-black dark:hover:text-white hover:text-white rounded-2xl transition-all cursor-pointer'>Buy : ${price}</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product