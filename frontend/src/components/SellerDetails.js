import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../redux/UsersSlice";

function SellerDetails({ seller }) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/auth/user/${seller}`, {
        method: "GET",
      });
      const json = await response.json();
      dispatch(setAllUsers(json));
    };
    fetchUser();
  });
  const formatCellNumber = (cellNumber) => {
    return cellNumber.replace(/^(\d{2})(\d{3})/, "$1 $2 ");
  };

  return (
    <div>
      {users && (
        <div className="flex justify-between">
          <div>
            <p>Name</p>
            <p>Contact</p>
          </div>
          <div>
            <p>{users.name}</p>
            <p>+{formatCellNumber(users.cellNo)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerDetails;
