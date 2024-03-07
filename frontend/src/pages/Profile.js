import { useState } from "react";
// React Icons
import { GrStatusGood } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { PiPackageFill } from "react-icons/pi";

// Custom hook and component
import useAddProduct from "../hooks/useAddProduct";
import Products from "../components/Profile/Product/Products";
import ProfileDetails from "../components/Profile/Profiles/ProfileDetails";
import { useSelector } from "react-redux";

const Profile = () => {
  const [tab, setTab] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const { auth } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { product } = useAddProduct();

  const tabActiveIndex = (tabIndex) => {
    setTab(tabIndex);
    setActiveButton(tabIndex);
  };

  return (
    <div className="flex my-4  select-none">
      {/* Product Added Message Popup */}
      {product && (
        <div className="error-backend flex border-2 border-green-500 bg-white p-2 rounded">
          <GrStatusGood className=" text-green-500 mx-1 text-lg mt-0.5" />
          <p className="text-black">Prodcut added successfully!</p>
        </div>
      )}
      <div className="tab border-e  md:w-[15%]">
        <div
          className={`links  ${activeButton === 1 ? "activeB" : ""}`}
          onClick={() => tabActiveIndex(1)}
        >
          <FaUser className=" icons" />

          <button className="tablinks ">Profile</button>
        </div>
        <div
          className={`links ${activeButton === 2 ? "activeB" : ""}`}
          onClick={() => tabActiveIndex(2)}
        >
          <PiPackageFill className=" icons" />

          <button className="tablinks">Prodcuts</button>
        </div>
      </div>
      {tab === 1 && (
        <ProfileDetails
          user={auth.user}
          products={products}
          token={auth.token}
        />
      )}
      {tab === 2 && <Products />}
    </div>
  );
};

export default Profile;
