import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProducts } from "../../../redux/userProductSlice";
import store from "../../../redux/store";
import UserImgUpload from "./UserImgUpload";
import FavProducts from "../Product/FavProducts";
import UserProducts from "./UserProducts";
import { setLoader } from "../../../redux/loaderSlice";

const ProfileDetails = ({ user, token, products }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { userProducts } = useSelector((state) => state.userProducts);
  const [productLength, setProductLenght] = useState("");

  const isLoggedIn = auth.user === user._id;
  // Fetching The userProducts
  useEffect(() => {
    if (user._id === auth.user._id && !userProducts?.length > 0) {
      const fetchProducts = async () => {
        try {
          const response = await fetch("/api/products/user-products", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, [dispatch, token]);
  return (
    <div className=" w-[75%] flex justify-between mx-[5%] py-4">
      <div className="w-[17%]  ">
        <div className="round-img mb-6">
          <img
            src={user.pic}
            alt=""
            className="w-[200px] h-[200px]  rounded-full  mb-2 "
          />
          {isLoggedIn && <UserImgUpload auth={auth} />}
        </div>

        <h2 className="w-[100%] text-lg font-medium border-b-2 border-black text-center">
          {auth.user._id === user._id
            ? `${productLength} Saved Products`
            : `${productLength} Published Products`}
        </h2>
      </div>
      <div className="w-[73%]  ">
        <div className="border-b-2 pb-10">
          <h2 className=" text-4xl font-semibold w-[100%] ">{user.name}</h2>
          <h2 className=" text-base font-normal">{user.email}</h2>
        </div>
        {auth.user._id === user._id ? (
          <FavProducts
            products={products}
            user={user}
            token={token}
            productLength={(s) => setProductLenght(s)}
          />
        ) : (
          <UserProducts
            user={user}
            token={token}
            products={products}
            productLength={(s) => setProductLenght(s)}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
