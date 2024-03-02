// import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { IoIosPerson } from "react-icons/io";
// import { IoIosSend } from "react-icons/io";
// import io from 'socket.io-client'
// import ScrollToBottom from 'react-scroll-to-bottom';

// const socket = io.connect("")

// function Support() {

//   const [currentMessage, setCurrentMessage] = useState("")
//   const [userName, setUserName] = useState("")
//   const [room, setRoom] = useState("")
//   const [flagChat, setFlagChat] = useState(false)
//   const [messageList, setMessageList] = useState([])
//   const [nameProfile, setNameProfile] = useState("")



//   const sendMessage =  () => {
    
//       if (currentMessage !== "") {
//         const messageData = {
//           room: room,
//           author: userName,
//           message: currentMessage,
//           time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
//         }
//         //  socket.emit("send_message", messageData)
//         setMessageList(list => [...list, messageData])
//       }
    
//   }
  

//   const joinRoom = () => {
//     if (userName !== "" && room !== "") {
//       // socket.emit("join_room", room)
//       setFlagChat(true)
//       // socket.emit("send_name_profile",userName)
//     }
//   }

//   // useEffect(() => {
//   //   // socket.on("recive_message", (data) => {
//   //   //   setMessageList(list => [...list, data])
//   //   // })
//   //   // socket.on("recive_user",(data,id)=>{
//   //   //   console.log(data,id);
//   //   // })
    
//   // }, [socket])
//   // useEffect(()=>{
//   //   // socket.on("recive_name_profile",data=>{
//   //   //   setNameProfile(data);
//   //   // })
//   // },[messageList])

//   return (
//     <>
//       {flagChat ? (
//         <div className='flex flex-col w-[90%] h-[500px] shadow-shadowPrimary mx-auto rounded-xl'>
//           {/* profile */}
//           <div className='w-full h-[20%] bg-white/90 rounded-t-xl'>
//             <div className='flex justify-evenly items-center w-[160px] xs:w-[250px] h-full '>
//               <div className='flex'>
//                 <IoIosPerson className='text-[40px] xs:text-[58px] rounded-full' />
//               </div>
//               <div>
//                 <div className='flex items-center gap-3 text-sm xs:text-lg font-semibold'>
//                   <p>Name :</p>
//                   <p>{nameProfile}</p>
//                 </div>
//                 <div className='flex items-center gap-3 text-xs xs:text-sm text-gray-500'>
//                   <p>Role :</p>
//                     {nameProfile.toLocaleLowerCase()==="admin" ? (
//                       <p>Support</p>
//                     ) : (
//                       <p>User</p>
//                     )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* chat */}
//           <div className='flex justify-end items-end w-full h-[70%] bg-white/10'>
//             <ScrollToBottom className='flex flex-col w-full h-full'>
//               <div className='chatPage flex flex-col w-full h-full'>

//                 {messageList.map((item, index) => (
//                   <div key={index} className={userName === item.author ? "flex flex-col items-end w-full h-full" : "flex flex-col items-start w-full h-full"}>
//                     <p className={userName === item.author ? "user" : "admin"}>
//                       {item.message}
//                     </p>
//                     <div className={userName=== item.author ?'flex justify-end items-center w-full gap-x-2 text-sm mt-1 mr-6' : 'flex justify-start items-center w-full gap-x-2 text-sm mt-1 pl-5'}>
//                       <p className=''>{item.author}</p>
//                       <p className=''>{item.time}</p>
//                     </div>
//                   </div>
//                 ))}

//               </div>
//             </ScrollToBottom>
//           </div>
//           {/* type */}
//           <div className='w-full h-[15%] bg-blue-100 rounded-b-xl'>
//             <div className='flex items-center justify-around h-full w-full'>
//               <input className='h-[80%] w-[80%] ml-2 outline-none bg-transparent' type="text" onChange={e => setCurrentMessage(e.target.value)} value={currentMessage} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder='Type a message here...' />
//               <div onClick={sendMessage} className='flex items-center justify-center w-9 h-9 xs:w-12 xs:h-12 bg-primryOrang rounded-full cursor-pointer'>
//                 <IoIosSend className='text-white text-xl xs:text-3xl' />
//               </div>
//             </div>
//           </div>
//         </div>

//       ) : (
//         <div className='flex flex-col w-[90%] h-[60%] mx-auto'>
//           <div className='flex flex-col sm:flex-row items-center justify-evenly sm:justify-center gap-x-5 w-[100%] h-full mx-auto'>
//             <input className='text-lg sm:text-2xl w-[80%] xs:w-[60%] h-auto lg:w-auto lg:h-auto p-5 bg-gray-500 outline-none rounded-xl' type="text" placeholder='UserName...' onChange={e => setUserName(e.target.value)} />
//             <input className='text-lg sm:text-2xl w-[80%] xs:w-[60%] h-auto lg:w-auto lg:h-auto p-5 bg-gray-500 outline-none rounded-xl' type="text" placeholder='Room ID...' onChange={e => setRoom(e.target.value)} />
//           </div>
//           <button className='w-[80%] xs:w-[50%] text-lg sm:text-xl font-semibold p-5 bg-green-700 hover:bg-green-700/10 hover:dark:bg-green-700/40 hover:text-white rounded-xl mx-auto transition-all' onClick={joinRoom}>Join A Room</button>
//         </div>
//       )}
//     </>
//   )
// }

// export default Support