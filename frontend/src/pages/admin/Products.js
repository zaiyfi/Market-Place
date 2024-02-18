// React/Redux Hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Importing Store and reducers
import store from "../.././redux/store";
import { setLoader } from "../.././redux/loaderSlice";
import { setProducts } from "../.././redux/productSlice";

// Other Modules
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useNavigate } from "react-router-dom";

// Function start
const Products = () => {
  const [productId, setProductId] = useState(false);
  const [status, setStatus] = useState(null);
  const [boolean, setBoolean] = useState(false);

  const navigate = useNavigate();

  // Redux
  const { products } = useSelector((state) => state.products);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Slicing the description of product
  const SliceDescription = (description, wordCount) => {
    const words = description.split(" ");
    if (words.length <= wordCount) {
      return description;
    }
    const truncatedWords = words.slice(0, wordCount);
    return `${truncatedWords.join(" ")}...`;
  };

  // Fetching The Products
  useEffect(() => {
    dispatch(setProducts(null));
    const fetchProducts = async () => {
      dispatch(setLoader(true));

      try {
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const json = await response.json();
        if (!response.ok) {
          console.log("response is not ok");
          dispatch(setLoader(false));
        }
        dispatch(setProducts(json));
        dispatch(setLoader(false));
        console.log(store.getState());
      } catch (error) {
        dispatch(setLoader(false));
      }

      dispatch(setLoader(false));
    };
    fetchProducts();
  }, [dispatch, auth, boolean]);

  // Updating the status of the product through PATCH API
  const updateStatus = async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      setBoolean(!boolean);
      console.log(store.getState());
      dispatch(setLoader(false));
      setProductId(null);
    } catch (error) {
      console.error("Error updating product status:", error);
      dispatch(setLoader(false));
      setProductId(null);
    }
  };
  // JSX
  return (
    <div className="antd mt-4">
      {/* Setting up the table to display Products */}
      <div className="flex flex-col mx-4 overflow-hidden">
        <div className="sm:-mx-6 lg:-mx-4">
          <div className="inline-block md:w-full py-2 sm:px-6 lg:px-8 ">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b font-medium  text-white dark:border-neutral-500 ">
                  <tr>
                    <th scope="col" className=" px-6 py-4">
                      Image
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Product
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Description
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Added
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* Displaying the Fetched Products */}
                {products &&
                  products.map((product) => (
                    <tbody key={product._id}>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6">
                          <img
                            src={product.images[0]}
                            alt=""
                            className="w w-28"
                          />
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          {product.sellerName}
                        </td>
                        <td
                          className="whitespace-nowrap  px-6 py-4 underline cursor-pointer"
                          onClick={() => navigate(`/product/${product._id}`)}
                        >
                          {product.name}
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          {SliceDescription(product.description, 7)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {product.status}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {formatDistanceToNow(new Date(product.createdAt), {
                            addSuffix: true,
                          })}
                        </td>
                        <td className="whitespace-nowrap flex gap-1 px-6 py-12 justify-center ">
                          {product.status === "Blocked" && (
                            <button
                              value="Approved"
                              onClick={(e) => {
                                setStatus(e.target.value);
                                setProductId(product._id);
                              }}
                            >
                              Approve
                            </button>
                          )}
                          {product.status === "Pending" && (
                            <div>
                              <button
                                value="Approved"
                                onClick={(e) => {
                                  setStatus(e.target.value);
                                  setProductId(product._id);
                                }}
                              >
                                Approve
                              </button>
                              <button
                                className=" ms-2"
                                value="Rejected"
                                onClick={(e) => {
                                  setStatus(e.target.value);
                                  setProductId(product._id);
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          )}

                          {product.status === "Approved" && (
                            <button
                              value="Blocked"
                              onClick={async (e) => {
                                setStatus(e.target.value);
                                setProductId(product._id);
                              }}
                            >
                              Block
                            </button>
                          )}
                          {product._id === productId && (
                            <button
                              onClick={() => updateStatus()}
                              className="submit"
                            >
                              Update
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
              {!products && (
                <div className="r p-6 text-lg font-bold">
                  <h1 className="text-center">No Products!</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Table END */}
    </div>
  );
};
// Function Ends

export default Products;
