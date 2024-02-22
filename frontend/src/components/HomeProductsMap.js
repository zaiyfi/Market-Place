import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

// Icons
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

function HomeProductsMap({ product, auth }) {
  const [saved, setSaved] = useState();
  const dispatch = useDispatch();
  const addFavProduct = async () => {
    const response = await fetch(
      `/api/auth/favProducts/${auth.user._id}/${product._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log(json);
    }
    if (response.ok) {
      console.log(json);
      dispatch(setUser(json));
    }
  };
  return (
    <div className="col shadow-lg shadow-gray relative" key={product._id}>
      {/* Product Image */}
      <div className=" flex items-center justify-center relative w-full h-2/3">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <h1 className="  text-xl">No Images Uploaded!</h1>
        )}
      </div>{" "}
      {/* Product info */}
      <div className="content px-4 pt-2">
        <div className="flex justify-between">
          <h2 className="font-extrabold text-lg">${product.price}</h2>
          <CiHeart
            className=" text-2xl cursor-pointer"
            onClick={() => {
              setSaved(product);
              addFavProduct();
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
          Product Details
        </h2>
      </div>
    </div>
  );
}

export default HomeProductsMap;
