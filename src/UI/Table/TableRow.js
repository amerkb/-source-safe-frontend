import React from "react";

const TableRow = ({ children,key }) => {
  return (
    <tr key={key}
     className="border-b-[1px]  duration-300 hover:bg-[#00000013]  border-[#dee2e6]">
      {children}
    </tr>
  );
};

export default TableRow;
