// React and Redux Hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoader } from "../redux/loaderSlice";
import { setProducts } from "../redux/productSlice";

// Other Modules
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import store from "../redux/store";
import SellerDetails from "../components/SellerDetails";

const ProductDetails = () => {
  // Redux states
  const { auth } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { productId } = useParams();

  // Get All Products
  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(setLoader(true));

      const response = await fetch(`/api/products`, {
        method: "GET",
      });
      if (!response.ok) {
        console.log("response is not ok");
        dispatch(setLoader(false));
      }
      const json = await response.json();
      dispatch(setProducts(json));
      console.log(store.getState());
      dispatch(setLoader(false));
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId, dispatch]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="product-details">
      <div className=" m-2">
        {products &&
          products
            .filter((product) => product._id === productId)
            .map((product) => (
              <div className="grid grid-cols-2 gap-5" key={product._id}>
                {/* Images  For    Product                                */}
                <div className="flex flex-col gap-2">
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[selectedIndex]}
                      className="object-cover w-full h-96 rounded-md"
                      alt=""
                    />
                  ) : (
                    <h1 className=" mt-4 text-center text-2xl">
                      No Images Uploaded!
                    </h1>
                  )}
                  <div className="flex gap-5 mt-2 ">
                    {product.images.map((image, index) => (
                      <div className="flex gap-5" key={index}>
                        <img
                          src={image}
                          className={`w-36 h-20 object-cover rounded-md cursor-pointer p-2 ${
                            selectedIndex === index
                              ? "border-2 border-primary"
                              : ""
                          }`}
                          onClick={() => setSelectedIndex(index)}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                  <hr className="my-2" />
                  <div className="gap-0">
                    <h2 className="text-lg font-semibold">Added on</h2>
                    <p className="">
                      {formatDistanceToNow(new Date(product.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                {/* Product      Info       Start                     */}
                <div className="flex flex-col gap-2" key={product._id}>
                  {" "}
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                    <span>{product.description}</span>
                  </div>
                  <hr className="my-2" />
                  {/* Product      and       Owner      Details      Start */}
                  <div>
                    {" "}
                    <h1 className="text-xl font-bold">Product Details</h1>
                    {/* Product Details Start */}
                    <div className="flex justify-between w-full">
                      <div>
                        <p>Category</p>
                        <p>Purchased</p>
                        <p>Used</p>
                        <p>Bill Available</p>
                        <p>Box Available</p>
                        <p>Warranty Available</p>
                        <p>Accessories Available</p>
                        {product.location && <p>Location</p>}
                        <p>Price</p>
                      </div>
                      <div className="text-center">
                        <p>{product.category}</p>
                        <p>
                          {new Date(
                            Date.now() -
                              product.used * 365 * 24 * 60 * 60 * 1000
                          ).getFullYear()}
                        </p>
                        <p>
                          {product.used === 0
                            ? "Not Used"
                            : product.used === 1
                            ? "1 year"
                            : `${product.used} years`}
                        </p>
                        <p>{product.billAvailable === true ? "Yes" : "No"}</p>
                        <p>{product.boxAvailable === true ? "Yes" : "No"}</p>
                        <p>
                          {product.warrantyAvailable === true ? "Yes" : "No"}
                        </p>
                        <p>
                          {product.accessoriesAvailable === true ? "Yes" : "No"}
                        </p>
                        <p>{product.location}</p>
                        <p>$ {product.price}</p>
                      </div>
                    </div>
                    {/* Product Details End */}
                    <hr className="my-2" />
                    {/* Owner Details */}
                    <h1 className="text-xl font-bold">Owner Details</h1>
                    {auth ? (
                      <SellerDetails seller={product.seller} />
                    ) : (
                      "You are not logged in!"
                    )}
                  </div>
                  {/* Product      and       Owner      Details      End */}
                </div>
                {/* Product       Info        End */}
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductDetails;
