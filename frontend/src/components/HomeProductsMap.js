import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function HomeProductsMap({ product }) {
  return (
    <div
      className="col cursor-pointer shadow-lg shadow-gray relative"
      onClick={() => window.open(`/product/${product._id}`, "_blank")}
      key={product._id}
    >
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
        <h2 className="font-extrabold text-lg">${product.price}</h2>
        <h2>{product.name}</h2>
        <p className=" text-xs font-light p-0">
          {formatDistanceToNow(new Date(product.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
}

export default HomeProductsMap;
