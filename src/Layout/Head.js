import React from "react";
import IconToggle from "../UI/Header/IconToggle";
import { useSelector } from "react-redux";
import Search from "../UI/Header/Search";
import Profie from "../UI/Header/Profie";

const Head = () => {
  const toggle = useSelector((state) => state.Sidebar.toggle);
  return (
    <nav
      className={`px-[40px] py-2 flex items-center justify-between h-[4rem] duration-500 `}
    >
      
<div></div>        <Profie />
    </nav>
  );
};

export default Head;
