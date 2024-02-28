import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, json } from 'react-router-dom'
import apiRequest from '../../Services/Axios/config'
import { MdOutlineSpeed } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import restaurantCotext from '../../context/contextData';
import { BsChatSquare } from "react-icons/bs";
import axios from 'axios';

function Account() {

    let contextData = useContext(restaurantCotext)

    const [data, setData] = useState([])
    const [resultData, setResultData] = useState([])

    useEffect(() => {
        axios.get("https://foodhut-server.liara.run/users")
            .then(res => {
            return res.data.forEach(item => setData(prevState => [...prevState, item]))
            })
            .catch(err=>console.log("error : "+err))
        }, [])

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem("userAccount"))
        let result = data.filter(item => item.email === localData.email)
        result.map(item => setResultData([item]))
    }, [data])

    const logOutHandler = (e) => {
        e.preventDefault()
        contextData.setIsLogin(false)
        localStorage.setItem("userAccount", JSON.stringify(""))
        contextData.setModalLogin(false)
        contextData.setModalLogout(true)
        setTimeout(()=>{
        contextData.setModalLogout(false)

        },5000)
    }

    return (
        <>
            {contextData.isLogin ? (
                <div className='w-full h-screen dark:headerbgc dark:bg-black mx-auto'>
                    <div className='w-full h-full flex items-start justify-between mt-20 md:mt-10'>
                        <div className='flex flex-col items-start child:ml-5 child:mt-5 child:text-xs child:xs:text-sm child:sm:text-lg w-[60%] xs:w-[40%] lg:w-[20%] h-full bg-gray-200 dark:bg-gray-900 shadow-shadowPrimary rounded-tr-lg'>
                            <NavLink className={link => link.isActive ? "flex flex-wrap items-center text-primryOrang transition-all gap-x-1" : "flex flex-wrap items-center text-primryBlackLight dark:text-white transition-all gap-1"} to={"mydashboard"}><span><MdOutlineSpeed /></span> My Dashboard</NavLink>
                            <NavLink className={link => link.isActive ? "flex flex-wrap items-center text-primryOrang transition-all gap-x-1" : "flex flex-wrap items-center text-primryBlackLight dark:text-white transition-all gap-1"} to={"payments"}><span><FaMoneyCheckAlt /></span> Payments</NavLink>
                            {contextData.isAdmin ? (
                                <NavLink className={link => link.isActive ? "flex flex-wrap items-center text-primryOrang transition-all gap-x-1" : "flex flex-wrap items-center text-primryBlackLight dark:text-white transition-all gap-1"} to={"chats"}><span><BsChatSquare /></span> chats</NavLink>
                            ) : (
                                <NavLink className={link => link.isActive ? "flex flex-wrap items-center text-primryOrang transition-all gap-x-1" : "flex flex-wrap items-center text-primryBlackLight dark:text-white transition-all gap-1"} to={"support"}><span><MdSupportAgent /></span> Support</NavLink>
                            )}
                            {contextData.isLogin ? (
                                <a onClick={e => logOutHandler(e)} className='flex flex-wrap items-center dark:text-white dark:hover:text-primryOrang hover:text-primryOrang transition-all gap-x-1' href="#"><IoExitOutline />Log Out</a>

                            ) : (
                                <Navigate to={"/"} />
                            )}
                        </div>
                        <div className='w-full h-full'>
                            <Outlet context={resultData} />
                        </div>
                    </div>
                </div>
            ) : (
            <Navigate to={"/"}/>
        )}
        </>
    )
}

export default Account