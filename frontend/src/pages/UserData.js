import { useSelector } from "react-redux";
import ProfileDetails from "../components/Profile/Profiles/ProfileDetails";
import { useParams } from "react-router-dom";

const UserData = () => {
  const { auth } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.users);
  const { userId } = useParams();
  const user = users.length > 0 ? users.find((u) => u._id === userId) : "";
  return (
    <div>
      <ProfileDetails user={user} token={auth.token} products={products} />
    </div>
  );
};

export default UserData;
