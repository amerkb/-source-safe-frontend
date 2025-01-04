import React from "react";

const Submit = ({value='Submit'}) => {
  return (
    <div>
      <button
        type="submit"
        className="bg-secondary text-center hover:bg-[#bc2634] duration-200  text-white font-semibold outline-none min-w-[120px]  px-4 py-[0.625rem] text-[14px] rounded-[0.25rem] border-[1px] border-transparent"
      >
        {value}
      </button>
    </div>
  );
};

export default Submit;
