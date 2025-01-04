import React from "react";

const ContainerPop = ({ children }) => {
  return (
    <div
      className={`fixed z-50 top-0 right-0 bottom-0 left-0 flex flex-row  justify-center p-2.5 items-center 
      bg-[#00000066] overflow-x-hidden transition-colors duration-100 `}
    >
      {children}
    </div>
  );
};
export default ContainerPop;
