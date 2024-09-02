// importing Components and Modules
import { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";

// Redux Store, Hooks, and Slices
import store from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loaderSlice";
import { deleteProduct } from "../../../redux/productSlice";

// React Icons
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

// Other modules
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Button } from "antd";
import { deleteUserProduct } from "../../../redux/userProductSlice";
import { useNavigate } from "react-router-dom";

const Products = () => {
  // use States
  const [showProductForm, setShowProductForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [productId, setProductId] = useState(false);

  // Redux
  const { auth } = useSelector((state) => state.auth);
  const { userProducts } = useSelector((state) => state.userProducts);

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Slicing the description of product
  const SliceDescription = (description, wordCount) => {
    const words = description.split(" ");
    if (words.length <= wordCount) {
      return description;
    }
    const truncatedWords = words.slice(0, wordCount);
    return `${truncatedWords.join(" ")}...`;
  };

  // Deleteing the Product
  const handleDelete = async (productId) => {
    dispatch(setLoader(true));
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      dispatch(setLoader(false));
    }

if(response.ok){
  dispatch(deleteProduct(json));
  dispatch(deleteUserProduct(json))
  dispatch(setLoader(false));
  console.log(store.getState());
}
  };

  // JSX
  return (
    <div className="w-[75%]  me-[5%] ">
      {/* Setting up the table to display Products */}
      <div className="w-[100%]  flex flex-col ">
        <div className="sm:-mx-6 lg:-mx-4">
          <div className="inline-block md:w-full pb-2 sm:px-6 lg:px-8 ">
            <div className="">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b font-medium  text-white dark:border-neutral-500 ">
                  <tr>
                    <th scope="col" className=" px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Description
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Date
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* Displaying the Fetched Products */}
                {userProducts &&
                  userProducts.length > 0 &&
                  userProducts.map((product) => (
                    <tbody key={product._id}>
                      <tr className="border-b dark:border-neutral-500">
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
                        {/* Delete Product */}
                        <td className="whitespace-nowrap flex gap-1 px-6 py-4 justify-center">
                          <AiOutlineDelete
                            className=" cursor-pointer text-lg "
                            onClick={() => {
                              handleDelete(product._id);
                            }}
                          />
                          {/* Edit Product */}
                          <AiOutlineEdit
                            className=" cursor-pointer text-lg"
                            onClick={() => {
                              setEditForm(true);
                              setShowProductForm(true);
                              setProductId(product._id);
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
              {userProducts && userProducts.length === 0 && (
                <div className="r p-6 text-lg font-bold">
                  <h1 className="text-center">No Products!</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Table END */}
      {/* antd Button to Show antd Modal */}
      <div className="flex justify-end">
        <Button
          type="primary"
          className="me-[10%]"
          open={showProductForm}
          onClick={() => setShowProductForm(true)}
        >
          Add Product
        </Button>
      </div>
      {/* Showing the Product Form If user clicks on the upper Button */}
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          editForm={editForm}
          setEditForm={setEditForm}
          productId={productId}
        />
      )}
      {/* End */}
    </div>
  );
};

export default Products;
