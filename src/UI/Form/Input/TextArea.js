import React from "react";

const TextArea = ({ label, placeholder, name, value }) => {
  return (
    <div className="px-[5px] mb-6 text-[rgb(73,80,87)] text-[14px]  grid col-span-full">
      <label className="mb-2 text-start" name={name}>
        {label}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        required
        defaultValue={value}
        className="border-[#0000001a] focus:border-[#80bdff] input-box h-32  border-[1px] 
        duration-200
         rounded-[0.25rem] py-[0.375rem] px-[0.75rem]  outline-none"
      ></textarea>
    </div>
  );
};

export default TextArea;
