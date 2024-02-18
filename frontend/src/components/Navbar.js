import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { setUser } from "../redux/authSlice";
import { IoMdArrowDropdown } from "react-icons/io";
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

  return (
    <div className="sticky top-0">
      <header className="shadow-md shadow-gray drop-shadow-md flex justify-between p-6 items-center">
        <Link className="logo text-xl font-bold" to="/">
          MarketPlace
        </Link>

        {auth && (
          <div>
            <div
              className={`nav-t-r  shadow-2xl${
                dropdown === true
                  ? " bg-primary text-white"
                  : "bg-white text-primary"
              } `}
              onClick={() => setDropdown(!dropdown)}
            >
              <button
                to={auth.user_role === "User" ? "/profile" : "/admin"}
                className="font-semibold"
              >
                {auth.user_name}
              </button>
              <IoMdArrowDropdown className="" />
            </div>

            {dropdown === true && (
              <div className="dropdown shadow-2xl ">
                <Link
                  to={auth.user_role === "User" ? "/profile" : "/admin"}
                  onClick={() => setDropdown(!dropdown)}
                >
                  Profile
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
