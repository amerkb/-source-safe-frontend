import React from 'react';
import HeroPhoto from "../../Assets/top-header.png";

export const Hero = () => {
  return (
    <div
      className="relative h-[180px] bg-gradient-to-r z-0 from-blue-500 via-blue-600 to-blue-700 rounded-sm shadow-lg"
      style={{
        backgroundImage: `url(${HeroPhoto})`, // Use template literal to set the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-b-lg"></div>
      <div className="relative w-full px-6 py-8 z-10">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              Hello Mr. Samer!
            </h1>
            <p className="mt-2 text-lg text-gray-200 drop-shadow-sm">
              See the impact of your website with detailed statistics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
