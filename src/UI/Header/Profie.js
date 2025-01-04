import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Profie = () => {
  const [open, Setopen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="relative links  " onClick={() => Setopen(!open)}>
      <img
        className="w-[50px] h-[50px] rounded-full  "
        src="01.png"
      />

      <ul className={` bg-white text-lg font-bold text-center text-[#6c757d] duration-500  
        ul absolute top-[57px]  ${open ? "right-5 " : "-right-52  "}`}>
        <li className="px-4 py-1" onClick={() => handleLogout()}>
          <span className="flex hover:text-[#ff6877] duration-300  items-center">
            <CiLogout className=" mr-[20px]" />
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Profie;
