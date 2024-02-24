import { useState } from "react";
// React Icons
import { GrStatusGood } from "react-icons/gr";
import { FaUser } from "react-icons/fa";

// Custom hook and component
import useAddProduct from "../hooks/useAddProduct";
import Products from "../components/Profile/Product/Products";

const Profile = () => {
  const [tab, setTab] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const { product } = useAddProduct();

  return (
    <div>
      {/* Product Added Message Popup */}
      {product && (
        <div className="error-backend flex border-2 border-green-500 bg-white p-2 rounded">
          <GrStatusGood className=" text-green-500 mx-1 text-lg mt-0.5" />
          <p className="text-black">Prodcut added successfully!</p>
        </div>
      )}
      <div className="tab border-e ">
        <div className="tab-content">
          <button
            className={`tablinks ${
              activeButton === 2 ? "activeB" : ""
            } flex justify-center
            `}
            onClick={() => {
              setTab(2);
              setActiveButton(2);
            }}
          >
            <FaUser className=" me-2 mt-1  shadow-lg shadow-gray-400 rounded-md" />
            Profile
          </button>
          <button
            className={`tablinks ${activeButton === 1 ? "activeB" : ""}`}
            onClick={() => {
              setTab(1);
              setActiveButton(1);
            }}
          >
            Products
          </button>
        </div>
      </div>

      {tab === 1 && <Products />}
    </div>
  );
};

export default Profile;
