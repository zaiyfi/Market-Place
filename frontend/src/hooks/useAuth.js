// import { useSelector } from "react-redux";
// export const useAuth = () => {
//   const auth = useSelector((state) => state.auth.auth);
//   return auth;
// };

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "../redux/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const auth = useSelector((state) => state.auth.auth);
  return auth;
};
