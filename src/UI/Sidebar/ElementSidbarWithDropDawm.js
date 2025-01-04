import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import SetElementSidebarReducer, {
  setElement,
} from "../../Redux/SidebarReducer";
import { Link } from "react-router-dom";
const ElementSidbarDropDawn = (props) => {
  const { title, show, icon: IconComponent } = props;
  const elementActive = useSelector((state) => state.Sidebar.elementActive);
  const dispatch = useDispatch();
  const handleClick = () => {
    const value = title === elementActive ? "" : title;
    dispatch(setElement(value));
  };

  return (
    <li className=" ">
      <span
        onClick={handleClick}
        className="pr-0 py-[12px]  pl-[25px]  flex hover:text-primary duration-300 relative  items-center"
      >
        {IconComponent && <IconComponent className={"text-[16px] mr-[20px]"} />}
        {show}
        <IoIosArrowForward
          className={`absolute right-3 duration-300 text-[14px]
        ${elementActive === title ? "rotate-90" : "rotate-0"}    `}
        />
      </span>
      <ul
        className={`text-lg  pl-[19px] duration-300 overflow-hidden  ${elementActive === title ? "h-[5.3rem]" : "h-0"
          } `}
      >
        <Link to={`/Add${title}`} color="inherit" underline="none">
          <li className="pr-0 py-[8px]  pl-[25px] text-center whitespace-nowrap hover:text-primary  flex justify-start gap-x-3 items-center ">
            <svg class="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
              <g>
                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
              </g>
            </svg>
            <span className=" duration-100 flex  items-center">
              Add {title}
            </span>
          </li>
        </Link>
        <Link to={`/${show}`} color="inherit" underline="none">
          <li className="pr-0 py-[8px] hover:text-primary  pl-[25px] text-center   flex justify-start whitespace-nowrap gap-x-3 items-center    ">
            <svg class="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
              <g>
                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
              </g>
            </svg>
            <span className=" duration-100 flex  items-center">
              {show} List
            </span>
          </li>
        </Link>
      </ul>
    </li>
  );
};

export default ElementSidbarDropDawn;
