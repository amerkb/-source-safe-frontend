import React from "react";
import Logo from "../UI/Header/logo";
import ElementSidbar from "../UI/Sidebar/ElementSidbar";
import { MdDashboard } from "react-icons/md";
import ElementSidbarDropDawn from "../UI/Sidebar/ElementSidbarWithDropDawm";
import { useSelector } from "react-redux";
import { FaCodeBranch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import { IoIosSettings } from "react-icons/io";
import SocialGroupsSidbar from "../UI/Sidebar/SocialGroupsSidbar";
import AdvertisingSidbar from "../UI/Sidebar/AdvertisingSidbar";
import { FaCartShopping } from "react-icons/fa6";
import { FaServicestack } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaMoneyBill } from "react-icons/fa";


const Sidebar = () => {
  const toggle = useSelector((state) => state.Sidebar.toggle);
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      class={`list-none p-0 bg-white z-50  text-[#6c757d] shadow-lg  fixed top-0 left-0 duration-300
h-screen overflow-auto font-sans ${toggle ? "max-md:w-[225px] w-[255px]" : "w-[0px]"}`}
      aria-label="Sidebar"
    >
      <Logo />
      <ul class="list-none text-xl ] ">
        <ElementSidbar title="Dashboard" icon={MdDashboard} />
        <ElementSidbarDropDawn title="Panel"  show="Panels"  icon={FaCodeBranch} />
        <ElementSidbar title="Services" icon={FaServicestack} />
        <ElementSidbar title="Invoices" icon={FaFileInvoice} />
        <ElementSidbar title="Payment" icon={FaMoneyBill} />
        <ElementSidbarDropDawn title="Offer" show="Offers" icon={RiDiscountPercentFill} />
        <ElementSidbar title="Users" icon={FaUser} />
        <ElementSidbarDropDawn title="Employee" show="Employees" icon={ImUserTie} />
        <ElementSidbarDropDawn title="Shop AD" show="Shop ADS" icon={FaCartShopping} />
        <SocialGroupsSidbar title="Social Groups"/>
        <AdvertisingSidbar title="Advertising"/>
        <ElementSidbar title="Setting" icon={IoIosSettings} />

      </ul>
    </aside>
  );
};

export default Sidebar;
