import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { setUserProducts } from "../../redux/userProductSlice";
import store from "../../redux/store";
import HomeProductsMap from "../HomeProductsMap";

const ProfileDetails = () => {
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { userProducts } = useSelector((state) => state.userProducts);

  // Fetching The userProducts
  useEffect(() => {
    if (!userProducts.length > 0) {
      const fetchProducts = async () => {
        try {
          const response = await fetch("/api/products/user-products", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          const json = await response.json();
          if (!response.ok) {
            console.log("response is not ok");
          }
          if (response.ok) {
            dispatch(setUserProducts(json));
            console.log(store.getState());
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchProducts();
    } else {
      return;
    }
  }, [dispatch, auth]);
  return (
    <div className=" w-[75%] flex justify-between mx-[5%]">
      <div className="w-[15%]">
        <img
          src={auth.user.pic}
          alt=""
          className="w-[100%] rounded-full mb-8 "
        />

        <h2 className=" text-lg font-medium border-b-2 border-black text-center">
          {!auth.user.favProducts.length > 0
            ? "0"
            : auth.user.favProducts.length}{" "}
          Saved Products
        </h2>
      </div>
      <div className="w-[80%]">
        <div className="border-b-2 pb-10">
          <h2 className=" text-4xl font-semibold w-[100%] ">
            {auth.user.name}
          </h2>
          <h2 className=" text-base font-normal">{auth.user.email}</h2>
        </div>
        <div className="grid grid-cols-3 gap-5 my-6">
          {products &&
            products
              .filter((p) => auth.user.favProducts.includes(p._id))
              .map((p) => <HomeProductsMap product={p} auth={auth} />)}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
