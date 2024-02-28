import React, { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { IoIosPerson } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import apiRequest from '../../Services/Axios/config';
import restaurantCotext from '../../context/contextData';
import axios from 'axios';

function Payments() {

  let contextData = useContext(restaurantCotext)

  const [resultData, setResultData] = useState(false)
  const [basket, setBasket] = useState(false)
  const [req1, setReq1] = useState(false)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])
  const [id, setId] = useState("")
  const [userData, setUserData] = useState("")

  {/* fetch data from server when component mounted */ }

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem("userAccount"))
    axios.get("https://foodhut-server.liara.run/users")
      .then(res => {
        if (res.status <= 300) {
          setResultData(true)
          setId(res.data.filter(item => item.id === local.id)[0].id)
          return setUserData(...res.data.filter(item => item.id === local.id))
        } else {
          setResultData(false)
        }
      })
  }, [])

  useEffect(() => {
    if(userData.products){
      if (userData.products.length > 0) {
        setData(userData.products)
        setBasket(true)
      } else {
        setTotal(0)
        setBasket(false)
      }
    }
  }, [userData])

  useEffect(()=>{
    let number=0
    data.map(item=>{
      number+=item.num*item.price
    })
    setTotal(number);
    if(data.length===0){
      setBasket(false)
    }else{
      setBasket(true)
    }
  },[data])


  const removeHandler = async (e) => {
    
    
    let d = data.filter(item => item.id !== e.id)
    setData(d)

   
    await axios.put(`https://foodhut-server.liara.run/users/${id}`,{
      ...userData,
      products:d
    }).then(res=>console.log(res))
    .catch(error=>console.log(error))
  }

  return (
    <div>
      {resultData ? (
        <div className='w-[90%] h-full mx-auto'>
          {basket ? (
            <div className=' flex flex-col justify-between w-[200px] h-[400px] xs:w-[300px] xs:h-[300px] lg:w-[500px] lg:h-[500px] dark:text-white text-primryBlack bg-white/90 dark:bg-black/10 shadow-shadowPrimary rounded-3xl'>
              {/* top part */}
              <div className='flex flex-col justify-start w-full child:bgOdd h-[85%] overflow-y-auto'>
                {data.map((item, index) => (
                  <div key={index} className='flex items-center justify-between flex-col xs:flex-row w-full h-[150px] rounded-2xl'>
                    <div className='flex items-center justify-center w-full h-full'>
                      <img className='w-[50px] h-[50px] lg:w-[100px] lg:h-[100px]' src={`.${item.foodImg}`} alt="img" />
                    </div>
                    <div className='flex flex-col items-start w-[90%] h-full ml-2 xs:ml-0'>
                      <div className='flex items-center gap-x-4 w-full h-full'>
                        <p className='text-xs lg:text-lg font-semibold'>Name : </p>
                        <p className='text-xs lg:text-base'>{item.name}</p>
                      </div>
                      <div className='flex items-center gap-x-4 w-full h-full'>
                        <p className='text-xs lg:text-lg font-semibold'>Number : </p>
                        <p className='text-xs lg:text-base'>{item.num}</p>
                      </div>
                      <div className='flex items-center gap-x-4 w-full h-full'>
                        <p className='text-xs lg:text-lg font-semibold'>Price : </p>
                        <p className='text-xs lg:text-base'>{item.price}</p>
                      </div>
                    </div>
                    <div className='flex flex-col w-[80%] h-full'>
                      <div className='flex flex-col items-center justify-evenly w-full h-full'>
                        <p className='text-xs lg:text-lg font-semibold'>Total Price:</p>
                        <p className='text-xs lg:text-base'>${item.price * item.num}</p>
                      </div>
                      <div onClick={e => removeHandler(item)} className='flex flex-col items-center justify-center lg:text-4xl w-full h-full cursor-pointer'>
                        <MdDeleteForever />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* bottom part */}
              <div className='flex flex-col justify-around w-full h-[15%]'>
                <p className='flex items-center justify-center w-full h-full text-lg xs:text-2xl font-semibold text-white dark:text-black bg-primryOrang rounded-2xl cursor-pointer'>Checkout : $ {total}</p>
              </div>
            </div>

          ) : (
            <div className=' flex flex-col justify-between w-[200px] h-[200px] xs:w-[300px] xs:h-[300px] lg:w-[500px] lg:h-[500px] dark:text-white text-primryBlack bg-white/90 dark:bg-black/10 shadow-shadowPrimary rounded-3xl'>
              <div className='flex flex-col items-center justify-center w-full h-[85%] text-lg xs:text-2xl text-primryOrang fade font-semibold overflow-y-auto'>
                youre basket is empty...
              </div>
              <div className='flex flex-col justify-around w-full h-[15%]'>
                <p className='flex items-center justify-center w-full h-full text-lg xs:text-2xl font-semibold text-white dark:text-black bg-primryOrang rounded-2xl cursor-pointer'>Checkout : $ {total}</p>
              </div>
            </div>
          )}
        </div>

      ) : (
        <div className='w-[90%] h-full mx-auto'>
          <div className='flex items-center justify-center fade w-full h-full text-primryOrang text-2xl font-bold'>
            check youre connection(vpn)...
          </div>
        </div>
      )}
    </div>
  )
}

export default Payments