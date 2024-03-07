import HomeProductsMap from "../../HomeProductsMap";

const UserProducts = ({ user, products, token, productLength }) => {
  const filteredProducts = products.filter((p) => p.seller === user._id);
  productLength(filteredProducts.length);
  return (
    <div className="grid grid-cols-3 gap-5 my-6">
      {products &&
        filteredProducts.map((product) => (
          <div>
            <HomeProductsMap product={product} user={user} token={token} />
          </div>
        ))}
    </div>
  );
};

export default UserProducts;
