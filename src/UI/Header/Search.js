import React from 'react'
import { BiSearchAlt } from "react-icons/bi";

const Search = () => {
  return (
    <div className="w-[250px] relative">
    <input
      className=" bg-[#f0f0fa] outline-none rounded-[25px] duration-300  focus:bg-[#dedeed] w-[250px] px-[14px] py-[10px]"
      type="text"
      placeholder="Search here ..."
    />
    <BiSearchAlt className="absolute top-1/2 text-[#878793] text-xl -translate-y-1/2 right-2" />
    </div>
  )
}

export default Search
