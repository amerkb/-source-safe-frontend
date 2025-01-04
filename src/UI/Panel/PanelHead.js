import React from "react";

const PanelHead = (props) => {
  const { title, Class, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`p-6 text-start  ${Class} bg-white border-b-gray-100 border-b-2  text-black font-bold `}
    >
      {title}
    </div>
  );
};

export default PanelHead;
