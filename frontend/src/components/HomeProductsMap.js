import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

// Icons
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function HomeProductsMap({ product }) {
  const [saved, setSaved] = useState();
  return (
    <div className="col shadow-lg shadow-gray relative" key={product._id}>
      {/* Product Image */}
      <div className="relative w-full h-2/3">
        <img
          src={product.images[0]}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>{" "}
      {/* Product info */}
      <div className="content px-4 pt-2">
        <div className="flex justify-between">
          <h2 className="font-extrabold text-lg">${product.price}</h2>
          <CiHeart
            className=" text-2xl cursor-pointer"
            onClick={() => {
              setSaved(product);
              console.log(product);
            }}
          />
        </div>
        <h2>{product.name}</h2>
        <p className=" text-xs font-light p-0">
          {formatDistanceToNow(new Date(product.createdAt), {
            addSuffix: true,
          })}
        </p>
        <h2
          className="cursor-pointer underline"
          onClick={() => window.open(`/product/${product._id}`, "_blank")}
        >
          View Product
        </h2>
      </div>
    </div>
  );
}

export default HomeProductsMap;
