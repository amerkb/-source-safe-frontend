import React from "react";
import { Link } from "react-router-dom";

const Card = ({ imageUrl, title, description, link }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Image Section */}
      <a href={link} className="block px-4 pt-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-sm"
        />
      </a>

      {/* Content Section */}
      <div className="p-6">
        <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
          <a href={link} className="hover:underline">
            {title}
          </a>
        </h4>
        <p className="font-medium text-gray-600 dark:text-gray-400">
          {description}
        </p>
        {/* Button */}
        <div className="mt-4">
          <Link to={`/GroupDetails`} color="inherit" underline="none">

            <a
              href={link}
              className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition "
            >
              View Details
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
