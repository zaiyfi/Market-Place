// importing Components and Modules
import { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";

// Redux Store, Hooks, and Slices
import store from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loaderSlice";
import { deleteProduct, setProducts } from "../../../redux/productSlice";

// React Icons
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

// Other modules
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Button } from "antd";

const Products = () => {
  // use States
  const [showProductForm, setShowProductForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [productId, setProductId] = useState(false);

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
      try {
        dispatch(setLoader(true));
        const response = await fetch("/api/products/user-products", {
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
        if (response.ok) {
          dispatch(setProducts(json));
          dispatch(setLoader(false));
          console.log(store.getState());
        }
      } catch (error) {
        dispatch(setLoader(false));
        console.log(error);
      }
    };
    fetchProducts();
  }, [dispatch, auth]);

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

    dispatch(deleteProduct(json));
    dispatch(setLoader(false));
    console.log(store.getState());
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
                {products &&
                  products.length > 0 &&
                  products.map((product) => (
                    <tbody key={product._id}>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap  px-6 py-4">
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
                        <td className="whitespace-nowrap flex gap-1 px-6 py-4 justify-center">
                          <AiOutlineDelete
                            className=" cursor-pointer text-lg "
                            onClick={() => {
                              handleDelete(product._id);
                            }}
                          />
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
              {products && products.length === 0 && (
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
          className="me-4"
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
