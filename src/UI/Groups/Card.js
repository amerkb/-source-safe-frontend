import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, title }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
        {/* Button */}
        <div className="mt-4">
          <Link
            to={`/GroupDetails/${id}/${title}`}
            className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            View Details
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Card;
