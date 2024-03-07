const ProductInfo = ({ product }) => {
  return (
    <div className="">
      <h1 className="text-xl font-bold">Product Details</h1>

      <div className="flex justify-between w-full">
        <div>
          <p>Category</p>
          <p>Purchased</p>
          <p>Used</p>
          <p>Bill Available</p>
          <p>Box Available</p>
          <p>Warranty Available</p>
          <p>Accessories Available</p>
          {product.location && <p>Location</p>}
          <p>Price</p>
        </div>
        <div className="text-center">
          <p>{product.category}</p>
          <p>
            {new Date(
              Date.now() - product.used * 365 * 24 * 60 * 60 * 1000
            ).getFullYear()}
          </p>
          <p>
            {product.used === 0
              ? "Not Used"
              : product.used === 1
              ? "1 year"
              : `${product.used} years`}
          </p>
          <p>{product.billAvailable === true ? "Yes" : "No"}</p>
          <p>{product.boxAvailable === true ? "Yes" : "No"}</p>
          <p>{product.warrantyAvailable === true ? "Yes" : "No"}</p>
          <p>{product.accessoriesAvailable === true ? "Yes" : "No"}</p>
          <p>{product.location}</p>
          <p>$ {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
