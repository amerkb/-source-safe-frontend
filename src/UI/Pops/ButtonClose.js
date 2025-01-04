import React from "react";

const ButtonClose = ({onClick}) => {
  return (
    <button
    onClick={onClick}
      type="button"
      class="swal2-confirm swal2-styled"
      aria-label=""
      className=" bg-[#dd3333] inline-block  m-1 py-2 px-8 shadow-none font-medium border-x-[#dd3333] text-[1.0625em] rounded-[0.25em] text-white"
    >
      Cancel
    </button>
  );
};

export default ButtonClose;
