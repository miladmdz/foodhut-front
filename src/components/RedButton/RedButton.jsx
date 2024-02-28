import React from 'react'
import { NavLink } from 'react-router-dom'

function RedButton({text,to}) {

  const clickHandler=e=>{
    e.preventDefault()
  }

  return (
    <div>
        <NavLink onClick={e=>clickHandler(e)} to={to} className='py-2.5 px-5 bg-primryOrang hover:bg-primryOrang/80 rounded-full text-sm sm:text-base lg:text-lg text-white dark:text-primryBlack transition-all'>{text}</NavLink>
    </div>
  )
}

export default RedButton