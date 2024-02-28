import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import FoodBox from '../FoodBox/FoodBox';

import 'swiper/css/autoplay'
import 'swiper/css';

function SwiperComp({ delaySec, autoPlayFlag, loopFlag, data }) {

    let widthWindow = window.innerWidth
    let spaceSlider = 20
    let sliderView = 4
    let centerFlag = false

    if (widthWindow > 1410) {
        if (data.length < 4) {
            sliderView = data.length
        } else {
            sliderView = 4
        }
        spaceSlider = 20
        centerFlag = false
    } else if (widthWindow < 1410 && widthWindow > 1080) {
        if(data.length<3){
            sliderView=data.length
        }else{
            sliderView = 3
        }
        spaceSlider = 0
        centerFlag = false
    } else if (widthWindow < 1080 && widthWindow > 740) {
        if(data.length<2){
            sliderView=1
        }else{
            sliderView = 2
        }
        centerFlag = false
    } else if (widthWindow < 740 && widthWindow > 480) {
        sliderView = 1
        centerFlag = false
    } else {
        sliderView = 1
        centerFlag = true
    }


    return (
        <div className='flex w-full justify-between items-center mx-auto'>
            <Swiper
                spaceBetween={spaceSlider}
                slidesPerView={sliderView}
                centeredSlides={centerFlag}
                loop={loopFlag}
                autoplay={{
                    delay: delaySec,
                    disableOnInteraction: false
                }}

                modules={autoPlayFlag ? [Autoplay] : []}
            >
                {data.map(items => (
                    <SwiperSlide key={items.id}>
                        <FoodBox {...items} />
                    </SwiperSlide>

                ))}
            </Swiper>
        </div>

    )
}

export default SwiperComp