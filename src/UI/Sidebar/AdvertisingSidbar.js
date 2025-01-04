import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import SetElementSidebarReducer, {
  setElement,
} from "../../Redux/SidebarReducer";
import { Link } from "react-router-dom";
import { RiAdvertisementFill } from "react-icons/ri";
import { IoShareSocialSharp } from "react-icons/io5";
const AdvertisingSidbar = (props) => {
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
        <RiAdvertisementFill className={"text-[16px] mr-[20px]"} />
        Advertising
        <IoIosArrowForward
          className={`absolute right-3 duration-300 text-[14px]
        ${elementActive === title ? "rotate-90" : "rotate-0"}    `}
        />
      </span>
      <ul
        className={`text-lg  pl-[22px] duration-300 overflow-hidden  ${elementActive === title ? "h-[11rem]" : "h-0"
          } `}
      >
        <Link to={`/AdsPin`} color="inherit" underline="none">
          <li className="pr-0 py-[8px]  pl-[25px] text-center whitespace-nowrap hover:text-primary  flex justify-start gap-x-3 items-center ">
            <svg class="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
              <g>
                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
              </g>
            </svg>
            <span className=" duration-100 flex  items-center">
              Pin
            </span>
          </li>
        </Link>

        <Link to={`/AdsBanner`} color="inherit" underline="none">
          <li className="pr-0 py-[8px]  pl-[25px] text-center whitespace-nowrap hover:text-primary  flex justify-start gap-x-3 items-center ">
            <svg class="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
              <g>
                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
              </g>
            </svg>
            <span className=" duration-100 flex  items-center">
              Banner
            </span>
          </li>
        </Link>
        <Link to={`/Ads`} color="inherit" underline="none">
          <li className="pr-0 py-[8px]  pl-[25px] text-center whitespace-nowrap hover:text-primary  flex justify-start gap-x-3 items-center ">
            <svg class="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
              <g>
                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
              </g>
            </svg>
            <span className=" duration-100 flex  items-center">
              Home Page
            </span>
          </li>
        </Link>

        <Link to={`/Ads`} color="inherit" underline="none">
          <li className="pr-0 py-[8px]  pl-[25px] text-center whitespace-nowrap hover:text-primary  flex justify-start gap-x-3 items-center ">
            <svg class="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
              <g>
                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
              </g>
            </svg>
            <span className=" duration-100 flex  items-center">
              Top Result
            </span>
          </li>
        </Link>



      </ul>
    </li>
  );
};

export default AdvertisingSidbar;
