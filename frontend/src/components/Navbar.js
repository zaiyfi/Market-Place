import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { setUser } from "../redux/authSlice";
import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from "react";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  // redux states
  const auth = useAuth();
  const dispatch = useDispatch();

  // Router Navigate
  const navigate = useNavigate();

  // Logout Functionality
  const handleLogout = async () => {
    localStorage.removeItem("auth");
    navigate("/login");
    dispatch(setUser(null));
  };
  const path = window.location.pathname;
  return (
    <div className="sticky top-0">
      <header
        className={`shadow-md shadow-gray drop-shadow-md ${
          path === "/dashboard" && " shadow-none drop-shadow-none "
        }  flex justify-between py-4 px-6 items-center`}
      >
        <Link
          className={`logo text-xl font-bold ${
            path === "/dashboard" && "p-6 border-b"
          }`}
          to="/"
        >
          MarketPlace
        </Link>

        {/* Show this if user is logged in */}
        {/* DropDown */}
        {auth && (
          <div>
            <div
              className={`nav-t-r  shadow-2xl`}
              onClick={() => setDropdown(!dropdown)}
            >
              <img
                src={auth.user.pic}
                className="w-[40px] rounded-full "
                alt=""
              />
              <IoIosArrowDropdown
                className={`text-2xl transition-all ms-2 ${
                  dropdown === true && "rotate-180"
                }`}
              />
            </div>

            {dropdown === true && (
              <div className="dropdown shadow-2xl ">
                <Link
                  to={auth.user.role === "User" ? "/dashboard" : "/admin"}
                  onClick={() => setDropdown(!dropdown)}
                >
                  Dashboard
                </Link>
                <hr />
                <Link
                  to="/login"
                  onClick={() => {
                    handleLogout();
                    setDropdown(!dropdown);
                  }}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        )}
        {/* Show this if User is not logged in */}
        {!auth && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
