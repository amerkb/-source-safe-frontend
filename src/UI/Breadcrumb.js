import React from "react";
import { FaHome } from "react-icons/fa";

const Breadcrumb = (props) => {
  const { title } = props;

  return (
    <div>
      <ol className="flex items-center  gap-x-4 text-[14px]  py-5 pr-4  mb-3 ">
        <li className="flex items-center text-primary justify-center gap-x-2">
          <FaHome /> Home
        </li>
        <li className="text-[#6c757d]"> /</li>

        <li className="text-[#6c757d]"> {title}</li>
      </ol>
    </div>
  );
};

export default Breadcrumb;
