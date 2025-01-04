import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertReducer, { setSuccessRestaurant } from "../../Redux/AlertReducer";
const SuccessAlert = () => {
  const show = useSelector((state) => state.Alert.SuccessResturant);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(show);
    if (show) {
      const timer = setTimeout(() => {
        dispatch(setSuccessRestaurant(false));
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div
      className={`${
        show ? "opacity-100 h-[50px] " : "opacity-0 h-0 "
      }bg-[#e0ffef] duration-500 mb-4 rounded-[0.25rem] text-start text-[#07be6e] py-3 px-5 border-[1px]`}
    >
      <span className="font-bold">Well done!</span> You did the operation
      successfully.
    </div>
  );
};

export default SuccessAlert;
