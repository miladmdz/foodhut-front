import React, { useContext, useEffect, useState } from 'react'
import SwiperComp from '../swiper/Swiper'
import { FoodShopData, TitleShopData } from '../../data'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

import 'swiper/css/autoplay'
import 'swiper/css';
import restaurantCotext from '../../context/contextData';
import axios from 'axios';


function FoodShop() {
    {/* slider Title */ }
    let widthWindow = window.innerWidth
    let spaceSlider = 0
    let sliderView = 8
    let centerFlag = false

    if (widthWindow > 1280) {
        sliderView = 8
        spaceSlider = 0
        centerFlag = false
    } else if (widthWindow < 1280 && widthWindow > 1024) {
        sliderView = 5
        spaceSlider = 0
        centerFlag = false
    } else if (widthWindow < 1024 && widthWindow > 768) {
        sliderView = 4
        spaceSlider = 0
        centerFlag = false
    } else if (widthWindow < 768 && widthWindow > 640) {
        sliderView = 3
        spaceSlider = 0
        centerFlag = false
    } else if (widthWindow < 640 && widthWindow > 480) {
        sliderView = 3
        spaceSlider = 0
        centerFlag = true
    } else {
        sliderView = 3
        spaceSlider = 0
        centerFlag = false
    }

    let contextData = useContext(restaurantCotext)

    const [allData, setAllData] = useState()
    const [flagUp, setFlagUp] = useState(true)
    const [firstList, setFirstList] = useState(FoodShopData)
    const [isSell, setIsSell] = useState(true)
    const [isReq, setIsReq] = useState(true)


    const getData = () => {
        axios.get("https://foodhut-server.liara.run/dataMenu")
            .then(res => setAllData(res.data))
            .catch(err => {
                console.log(`Error : ${err}`);
                setIsReq(false)
            })
    }

    const titleHandler = async (e, item) => {

        await TitleShopData.map(item => item.flag = false)
        item.flag = !item.flag
        if (item.name.toLowerCase() !== "all") {
            setFirstList(allData.filter(Item => Item.title.toLowerCase() === item.name.toLowerCase()))
        } else {
            setFirstList(allData)
        }
        setFlagUp(prevState => !prevState)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
    }, [flagUp])
    useEffect(() => {
        if (firstList.length === 0) {
            setIsSell(false)
        } else {
            setIsSell(true)
        }
    }, [firstList])


    return (
        <>
            {/* title slider */}
            <div className='flex w-[300px] xs:w-[350px] sm:w-[350px] md:w-[500px] lg:w-[908px] xl:w-[1018px] mt-8 justify-between items-center mx-auto'>
                <Swiper
                    spaceBetween={spaceSlider}
                    slidesPerView={sliderView}
                    centeredSlides={centerFlag}
                    loop={false}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false
                    }}

                    modules={[Autoplay]}
                >
                    {TitleShopData.map(items => (
                        <SwiperSlide key={items.id}>
                            <div
                                onClick={(e) => titleHandler(e, items)}
                                className={items.flag ?
                                    "activeItem flex items-center mr-2 xs:mr-2 sm:mr-2 md:mr-2 lg:mr-0 lg:w-fit xl:w-auto xl:mr-2 justify-center text-center dark:text-primryBlack h-[44px] py-2.5 px-5 border-[3px] text-lg rounded-3xl cursor-pointer z-50" :
                                    "flex items-center mr-2 xs:mr-2 sm:mr-2 md:mr-2 lg:mr-0 lg:w-fit xl:w-auto xl:mr-2 justify-center text-center h-[44px] py-2.5 px-5 border-[3px] border-gray-500 text-gray-500 text-lg rounded-3xl cursor-pointer z-50"}
                            >
                                {items.name}
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>
            {/* menu shop */}
            {isReq ? (

                <div className='mt-10 h-[580px]'>

                    <div className={isSell ? "block" : "hidden"}>
                        <SwiperComp delaySec={1500} autoPlayFlag={true} loopFlag={true} data={firstList} />
                    </div>
                    <div className={isSell ? "hidden" : "block"}>
                        <div className='flex items-center justify-center'>
                            <h3 className='fade text-5xl mt-44'>Sold <span className='text-primryOrang'>Out 😔</span></h3>
                        </div>
                    </div>
                </div>
            ) : (
                <h2 className="h-[580px] flex items-center fade justify-between text-center text-primryOrang text-xl font-bold">Please Check Youre Internet...</h2>

            )}
        </>
    )
}

export default FoodShop