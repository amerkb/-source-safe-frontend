import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import profile from "../../Assets/01.png";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="relative links" onClick={() => setOpen(!open)}>
      <img
        className="w-[50px] h-[50px] rounded-full"
        src={profile} // Use the imported image variable
        alt="Profile" // Always include an alt attribute for accessibility
      />
    <ul
        className={`absolute text-gray-700 z-50 bg-gray-100 dark:text-gray-50 dark:bg-gray-900 shadow-lg rounded-lg text-lg font-medium text-gray-600 -right-1 mt-2 w-32 
           transform transition-all duration-300 ease-in-out ${
             open
               ? "scale-100 opacity-100"
               : "scale-75 opacity-0 pointer-events-none"
           }`}
      >
        <li
          className="flex items-center px-4 py-2 text-sm cursor-pointer  hover:text-red-500   justify-center  transition-all duration-300 rounded-lg"
          onClick={handleLogout}
        >
          <CiLogout className="mr-2 text-lg" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Profile;
