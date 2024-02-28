import React, { useContext, useEffect, useState } from 'react'
import { FaEye, FaLiraSign } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, Navigate } from 'react-router-dom';
import restaurantCotext from '../../context/contextData';
import { Users } from '../../data';
import apiRequest from '../../Services/Axios/config';
import axios from 'axios';

function Register() {


  let contextData = useContext(restaurantCotext)

  const [users, setUsers] = useState([])

  const [seePass, setSeePass] = useState(false)
  const [seePassAgain, setSeePassAgain] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [passTwo, setPassTwo] = useState("")

  const [lengthName, setLengthName] = useState(true)
  const [isEmail, setIsEmail] = useState(true)
  const [isAddress, setIsAddress] = useState(true)
  const [isPass1, setIsPass1] = useState(true)
  const [isPass2, setIsPass2] = useState(true)

  useEffect(() => {
    if (name.length > 2) {
      setLengthName(false)
    } else {
      setLengthName(true)
    }
  }, [name])

  useEffect(() => {
    const re = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
    const myArray = re.exec(email)
    if (myArray) {
      setIsEmail(false)
    } else {
      setIsEmail(true)
    }
  }, [email])

  useEffect(() => {
    if (address.length > 5) {
      setIsAddress(false)
    } else {
      setIsAddress(true)
    }
  }, [address])

  useEffect(() => {
    if (password.length > 4) {
      setIsPass1(false)
    } else {
      setIsPass1(true)
    }
  }, [password])

  useEffect(() => {
    if (passTwo.length > 4) {
      setIsPass2(false)
    } else {
      setIsPass2(true)
    }
  }, [passTwo])

  useEffect(() => {
    axios.get("https://foodhut-server.liara.run/users")
      .then(res => setUsers(res.data))
  }, [])


  const registerHandler = (e) => {
    e.preventDefault()
    if (!lengthName && !isEmail && !isAddress && !isPass1 && !isPass2) {
      let newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        address,
        products: []
      }
      if (passTwo === password && name && email && password) {
        contextData.setIsLogin(true)
        axios.post(`https://foodhut-server.liara.run/users`, {
        ...newUser
        })
          .then(res => {
            if (res.status < 300) {
              contextData.setModalRegister(true)
            }
          }).catch(error=>console.log(error))
        localStorage.setItem("userAccount", JSON.stringify(newUser))
        setTimeout(() => {
          contextData.setModalRegister(false)

        }, 5000)
      } else {
        alert("not match password")
      }
    } else {
      alert("please check the errors")
    }

  }


  return (
    <div>
      <>
        <div className='w-[90%] h-fit md:h-screen mx-auto mt-20 sm:mt-10'>
          <div className='flex flex-col md:flex-row items-center justify-between w-full h-full mt-10'>
            {/* left part */}
            <div className='flex items-center justify-center w-[200px] h-[200px] xs:w-[280px] xs:h-[280px] sm:w-[325px] sm:h-[325px] md:w-[50%] md:h-full' data-aos="flip-up" data-aos-duration="600">
              <img className='w-auto h-auto' src="./images/login/register.png" alt="food image" />
            </div>
            {/* right part */}
            <div className='flex flex-col items-start  md:w-[50%] h-[1200px] xs:h-[900px]' data-aos="flip-down" data-aos-duration="600">
              <div className='flex flex-col items-center justify-evenly w-full h-[170px]'>
                <h2 className='text-5xl font-bold w-full h-fit dark:text-white'>Register</h2>
                <p className='text-lg text-gray-500 w-full h-fit'>Please,Enter youre details to Register</p>
              </div>
              <form action="" className='flex flex-col items-start justify-around w-full h-[100%]'>
                {/* username */}
                <div className='w-full xl:w-[50%] border-b-[1px] border-gray-300'>
                  <label htmlFor="name" className='text-gray-500 text-sm'>YOURE NAME</label>
                  <input value={name} onChange={e => setName(e.target.value)} id='name' className='w-full h-16 text-xl outline-none bg-transparent placeholder:text-black/80 placeholder:dark:text-white dark:text-white' type="text" placeholder='Enter youre Name' required />
                </div>
                <p className={lengthName ? 'text-red-500' : 'hidden'}>You're Length Name Should Be More Than 2 Charcter </p>
                {/* email */}
                <div className='w-full xl:w-[50%] border-b-[1px] border-gray-300'>
                  <label htmlFor="email1" className='text-gray-500 text-sm'>YOURE EMAIL</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} id='email1' className='w-full h-16 text-xl outline-none bg-transparent placeholder:text-black/80 placeholder:dark:text-white dark:text-white' type="email" placeholder='Enter youre Email Address' required />
                </div>
                <p className={isEmail ? 'text-red-500' : 'hidden'}>Please enter email address (example@gmail.com)</p>
                {/* address */}
                <div className='w-full xl:w-[50%] border-b-[1px] border-gray-300'>
                  <label htmlFor="address" className='text-gray-500 text-sm'>YOURE ADDRESS</label>
                  <input value={address} onChange={e => setAddress(e.target.value)} id='address' className='w-full h-16 text-xl outline-none bg-transparent placeholder:text-black/80 placeholder:dark:text-white dark:text-white' type="text" placeholder='Enter youre Address' required />
                </div>
                <p className={isAddress ? 'text-red-500' : 'hidden'}>Youre address length should be more than 5 charcter</p>

                {/* pass */}
                <div className='w-full xl:w-[50%] border-b-[1px] border-gray-300'>
                  <label htmlFor="pass" className='text-gray-500 text-sm'>YOURE PASSWORD</label>
                  <div className='flex items-center'>
                    <input value={password} onChange={e => setPassword(e.target.value)} id='pass' className='w-full h-16 text-xl outline-none bg-transparent placeholder:text-black/80 placeholder:dark:text-white dark:text-white' type={seePass ? "text" : "password"} placeholder='Enter youre Password' required minLength={5} />
                    <div onClick={() => setSeePass(prevState => !prevState)} className='text-gray-500 text-2xl cursor-pointer'>
                      {seePass ? (<FaEyeSlash />) : (<FaEye />)}
                    </div>
                  </div>
                </div>
                <p className={isPass1 ? 'text-red-500' : 'hidden'}>Youre password length should be more than 5 charcter</p>

                <div className='w-full xl:w-[50%] border-b-[1px] border-gray-300'>
                  <label htmlFor="passagain" className='text-gray-500 text-sm'>YOURE PASSWORD AGAIN</label>
                  <div className='flex items-center'>
                    <input value={passTwo} onChange={e => setPassTwo(e.target.value)} id='passagain' className='w-full h-16 text-xl outline-none bg-transparent placeholder:text-black/80 placeholder:dark:text-white dark:text-white' type={seePassAgain ? "text" : "password"} placeholder='Enter youre Password Again' required minLength={5} />
                    <div onClick={() => setSeePassAgain(prevState => !prevState)} className='text-gray-500 text-2xl cursor-pointer'>
                      {seePassAgain ? (<FaEyeSlash />) : (<FaEye />)}
                    </div>
                  </div>
                </div>
                <p className={isPass2 ? 'text-red-500' : 'hidden'}>Youre password length should be more than 5 charcter</p>

                {/* create account */}
                <div className='w-full xl:w-[50%]'>
                  {contextData.isLogin ? (
                    <Navigate to={"/"} />
                  ) : (
                    <a onClick={e => registerHandler((e))} href='#' className='flex justify-center w-full bg-primryOrang text-white text-xl py-4 rounded-xl hover:w-[104%] hover:opacity-85 transition-all mt-10 md:mt-8'>Create Account</a>
                  )}
                </div>
                <p className='w-full xl:w-[50%] flex justify-center text-sm text-gray-400 my-5 md:mt-5'>Already a member? <NavLink to={"/Login"} className='text-primryOrang'>Log In</NavLink></p>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default Register