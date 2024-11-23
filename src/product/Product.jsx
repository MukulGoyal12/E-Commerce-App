import clsx from "clsx";
import React, { useEffect, useState, memo } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import { Link } from "react-router-dom";
import StarSVG from "../SVG/StarSVG";

const Product = ({ id, title, category, rating, price, images, thumbnail }) => {
  return (
    <div className=" my-4 font-bold flex flex-col gap-1 flex-shrink">
      <ProgressiveImage src={images[0]} placeholder={thumbnail}>
        {(src) => (
          <img
            className="w-full aspect-square object-contain object-center"
            src={src}
            alt={title}
          />
        )}
      </ProgressiveImage>
      <h4 className="text-gray-500 mx-2">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h4>
      <h2 className="mx-2 truncate">{title}</h2>
      <div className="mx-2">
        <Stars rating={rating} />
      </div>
      <h3 className="mx-2 my-2">${price}</h3>
      <Link
        to={`/product/${id}`}
        className="hover:bg-orange-500 border-2 border-orange-500 hover:text-white p-1 sm:p-2 text-orange-500 text-center font-bold sm:text-xl transition duration-300 ease-in-out"
      >
        View Details
      </Link>
    </div>
  );
};

export default memo(Product);

export const Stars = ({ rating }) => {
  return (
    <div className="flex items-center">
      <StarSVG selected={rating >= 1} />
      <StarSVG selected={rating >= 2} />
      <StarSVG selected={rating >= 3} />
      <StarSVG selected={rating >= 4} />
      <StarSVG selected={rating >= 5} />
    </div>
  );
};
