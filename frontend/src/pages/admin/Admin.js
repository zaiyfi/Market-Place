import { useState } from "react";
import Products from "./Products";
import Users from "./users";
const Admin = () => {
  const [tab, setTab] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  return (
    <div className="mt-10">
      <div className="tab">
        <button
          className={`tablinks ${activeButton === 1 ? "activeB" : ""}`}
          onClick={() => {
            setTab(1);
            setActiveButton(1);
          }}
        >
          Products
        </button>
        <button
          className={`tablinks ${activeButton === 2 ? "activeB" : ""}`}
          onClick={() => {
            setTab(2);
            setActiveButton(2);
          }}
        >
          Users
        </button>
      </div>

      {tab === 1 && <Products />}

      {tab === 2 && <Users />}
    </div>
  );
};

export default Admin;
