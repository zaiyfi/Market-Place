import { useDispatch, useSelector } from "react-redux";
import MappingRow from "./MappingRow";
import { setProducts } from "../../redux/productSlice";
import { useEffect } from "react";
import { setLoader } from "../../redux/loaderSlice";
import store from "../../redux/store";

const AdminTable = () => {
  const { products } = useSelector((state) => state.products);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetching The Products
  useEffect(() => {
    if (!products.length > 0) {
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
    }
  }, [dispatch, auth]);

  return (
    <div>
      {/* Setting up the table to display Products */}
      <div className="w-[100%]  flex flex-col">
        <div className="sm:-mx-6 lg:-mx-4">
          <div className="inline-block md:w-full py-2 sm:px-6 lg:px-8 ">
            <div className="">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b font-medium  text-white dark:border-neutral-500 ">
                  <tr>
                    <th scope="col" className=" px-6 py-4">
                      User Name
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Product
                    </th>

                    <th scope="col" className=" px-6 py-4">
                      Status
                    </th>

                    <th scope="col" className=" px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* Displaying the Fetched Products */}
                {products &&
                  products?.map((product) => (
                    <MappingRow product={product} auth={auth} />
                  ))}
                {/* Table End */}
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
    </div>
  );
};

export default AdminTable;
