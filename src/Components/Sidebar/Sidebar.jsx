import React from 'react'
import { Link } from 'react-router-dom'
import add_product_icon from '../Assets/Product_Cart.svg'
import list_product_icon from '../Assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className="flex flex-col pt-[30px] gap-[20px] w-full max-w-[250px] h-screen bg-white
                    max-[800px]:flex-row max-[800px]:justify-center max-[800px]:h-auto max-[800px]:pt-[30px]">
      <Link to="/addproduct" className="no-underline">
        <div className="flex items-center justify-center mx-[20px] py-[5px] px-[10px] rounded-[6px] bg-[#F6F6F6] gap-[20px] cursor-pointer
                        max-[800px]:mx-0">
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to="/listproduct" className="no-underline">
        <div className="flex items-center justify-center mx-[20px] py-[5px] px-[10px] rounded-[6px] bg-[#F6F6F6] gap-[20px] cursor-pointer
                        max-[800px]:mx-0">
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
