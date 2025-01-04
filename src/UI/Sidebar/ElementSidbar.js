import React from "react";
import { Link } from "react-router-dom";

const ElementSidbar = (props) => {
  const { title, icon: IconComponent } = props;

  return (
    <Link to={`/${title}`} style={{ textDecoration: "none", color: "inherit" }}>
      <li className="  ">
        <span className="pr-0 py-[12px]  pl-[25px] flex hover:text-primary  duration-300  items-center">
          {IconComponent && <IconComponent className="text-[16px] mr-[20px]" />}
          {title}
        </span>
      </li>
    </Link>
  );
};

export default ElementSidbar;
