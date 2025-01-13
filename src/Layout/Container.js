import React from "react";
import { Hero } from "../UI/Hero/Hero";
import  Head  from "../Layout/Head";

const Container = ({ content }) => {

  return (
    <div
      className={`duration-300 min-h-[calc(100vh-4rem)] pl-[30px]}`}
    >
      <Head />
      <div className="relative z-10">

        <Hero />
      </div>
      <div
        className=" relative z-20 px-2 -mt-14">{content}</div>
    </div>
  );
};

export default Container;
