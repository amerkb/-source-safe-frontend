import React from "react";
import { useSelector } from "react-redux";
import Profie from "../UI/Header/Profie";

const Head = () => {
  const toggle = useSelector((state) => state.Sidebar.toggle);
  return (
    <nav
      className={`px-[40px] py-2 z-50 flex items-center justify-between h-[4rem] duration-500 `}
    >

      <div></div>        <Profie />
    </nav>
  );
};

export default Head;
