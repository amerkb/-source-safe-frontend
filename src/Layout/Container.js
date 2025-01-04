import React from "react";
import { Hero } from "../UI/Hero/Hero";

const Container = ({ content }) => {

  return (
    <div
      className={`duration-300 bg-secondary min-h-[calc(100vh-4rem)] pl-[30px]}`}
    >
      <div className="relative z-10">
        <Hero />
      </div>
      <div
        className=" relative z-20 px-2 -mt-14">{content}</div>
    </div>
  );
};

export default Container;
