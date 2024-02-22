// React/Redux Hooks and React Router
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Components
import Navbar from "./components/Navbar";
import LoaderSpinner from "./components/loaderSpinner";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Redux Store
import store from "./redux/store";
import Admin from "./pages/admin/Admin";
import Page404 from "./pages/Page404";
import ProductDetails from "./pages/ProductDetails";
import FavProducts from "./components/Profile/Product/FavProducts";

function App() {
  // Getting the state of loader
  const { loading } = useSelector((state) => state.loader);

  useEffect(() => {
    try {
      console.log(store.getState());
    } catch (error) {
      console.log("User is not Logged in!");
    }
  }, []);

  // Routing
  return (
    <BrowserRouter>
      <div className="App">
        {loading && <LoaderSpinner />}
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/product/:productId"} element={<ProductDetails />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedUserRoute>
                <Profile />
              </ProtectedUserRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            }
          />
          {/* Sign in/up Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
