import React, { useContext, useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, Navigate } from 'react-router-dom';
import restaurantCotext from '../../context/contextData';
import apiRequest from '../../Services/Axios/config';
import Aos from "aos"
import "aos/dist/aos.css"
import axios from 'axios';

function Login() {

  let contextData = useContext(restaurantCotext)

  const [seePass, setSeePass] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [allUser, setAllUser] = useState([])


  useEffect(()=>{
    Aos.init()
    axios.get("https://foodhut-server.liara.run/users")
    .then(res=>res.data.forEach(item=>setAllUser(prevState=>[...prevState, item])))
  },[])

  const loginHandler = () => {
   let user=allUser.filter(item=>item.email.toLowerCase()===email.toLocaleLowerCase()&&item.password===password)
   if(user.length>0){
      console.log(user);
      localStorage.setItem("userAccount",JSON.stringify(...user))
         contextData.setModalLogin(true)
         contextData.setIsLogin(true)
       setTimeout(()=>{
         contextData.setModalLogin(false)

       },5000)

    }else{
      alert("please check yore email and password")
    }
  }

  return (
    <>
      {contextData.isLogin ? (
        <Navigate to={"/"} />
      ) : (
        <div className='w-[90%] xs:h-[96.5vh] md:h-screen mx-auto '>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full h-[90%] md:h-full mt-28'>
            {/* left part */}
            <div className='flex items-center justify-center w-[180px] h-[180px] xs:w-[50%] xs:h-full' data-aos="flip-right" data-aos-duration="600">
              <img className='w-full h-full sm:w-auto sm:h-auto md:-mt-52' src="./images/login/burger1.png" alt="login image" />
            </div>
            {/* right part */}
            <div className='flex flex-col items-center sm:items-start w-full sm:w-[50%] h-[80%] md:h-full' data-aos="flip-left" data-aos-duration="600">
              <div className='flex flex-col items-center justify-between w-full h-[170px]'>
                <h2 className='text-3xl md:text-5xl text-center sm:text-start font-bold w-full h-0 dark:text-white'>Log In</h2>
                <p className='text-sm md:text-lg text-gray-500 text-center sm:text-start w-full h-20'>Please,Enter youre details to login</p>
              </div>
              <form action="" className='flex flex-col items-center sm:items-start justify-around w-full h-[80%] md:h-[60%]'>
                <div className='w-[70%] xl:w-[50%] border-b-[1px] border-gray-300'>
                  <label htmlFor="email" className='text-gray-500 text-xs md:text-sm'>YOURE EMAIL</label>
                  <input onChange={e => setEmail(e.target.value)} value={email} id='email' className='w-full h-16 lg:text-lg xl:text-xl outline-none bg-transparent dark:text-white placeholder:text-black/80 placeholder:dark:text-white' type="text" placeholder='Enter youre Email Address' />
                </div>
                <div className='w-[70%] xl:w-[50%] border-b-[1px] border-gray-300'>
                  <label htmlFor="pass" className='text-gray-500 text-xs md:text-sm'>YOURE PASSWORD</label>
                  <div className='flex items-center w-full'>
                    <input onChange={e => setPassword(e.target.value)} value={password} id='pass' className='w-full h-16 lg:text-lg xl:text-xl outline-none bg-transparent dark:text-white placeholder:text-black/80 placeholder:dark:text-white' type={seePass ? "text" : "password"} placeholder='Enter youre Password' />
                    <div onClick={() => setSeePass(prevState => !prevState)} className='text-gray-500 lg:text-xl xl:text-2xl cursor-pointer'>
                      {seePass ? (<FaEyeSlash />) : (<FaEye />)}
                    </div>
                  </div>
                </div>
                <NavLink to={"/forgetpassword"} className='w-[70%] h-[50px] xl:w-[50%] flex justify-end items-center text-primryOrang text-sm'>Forget Password?</NavLink>
                <div className='w-[70%] xl:w-[50%]'>
                  {contextData.isLogin ? (
                    <Navigate to={"/"} />
                  ) : (
                    <a onClick={loginHandler} href='#' className='flex justify-center w-full bg-primryOrang text-white dark:text-primryBlackLight text-xl py-4 rounded-xl hover:w-[104%] hover:opacity-85 transition-all'>Login</a>
                  )}
                </div>
                <p className='w-[70%] h-[50px] xl:w-[50%] flex flex-wrap justify-center items-center text-xs md:text-sm text-gray-400'>Don't have an account? <NavLink to={"/register"} className='text-primryOrang'> Create Account</NavLink></p>
              </form>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Login