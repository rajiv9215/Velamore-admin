import React from 'react'
import navlogo from '../Assets/nav-logo.svg'
import navprofileIcon from '../Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-[60px] py-[15px] shadow-md bg-white mb-[1px] max-[800px]:px-[30px]">
      <img src={navlogo} className="w-[200px] max-[800px]:w-[150px]" alt="logo" />
      <img src={navprofileIcon} className="w-[75px] max-[800px]:w-[60px]" alt="profile" />
    </div>
  )
}

export default Navbar
