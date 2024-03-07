import React from "react";
import HomeProductsMap from "../../HomeProductsMap";
import { useSelector } from "react-redux";

const FavProducts = ({ products, productLength }) => {
  const { auth } = useSelector((state) => state.auth);
  const filteredProducts = products.filter((p) =>
    auth.user.favProducts.includes(p._id)
  );
  productLength(filteredProducts.length);

  return (
    <div className="grid grid-cols-3 gap-5 my-6">
      {products &&
        filteredProducts.map((p) => (
          <HomeProductsMap product={p} user={auth.user} token={auth.token} />
        ))}
    </div>
  );
};

export default FavProducts;
