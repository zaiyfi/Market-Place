const requireAuth = require("../middleware/requireAuth");

// Importing the required components
const upload = require("../middleware/uploadImage");
const {
  addProduct,
  uploadImage,
  getProducts,
  getUserProducts,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  addReview,
} = require("../controllers/productController");

// setting the router
const router = require("express").Router();

// Checking Whether user in logged in or not

// Create/Update Products
router.post("/add", requireAuth, addProduct);
router.patch("/:_id", requireAuth, updateProduct);
router.patch("/addReview/:productId", requireAuth, addReview);

// Get Single/All Products
router.get("/", getProducts);
router.get("/user-products", requireAuth, getUserProducts);

// Delete Products
router.delete(
  "/deleteImage/:productId/:imageIndex",
  requireAuth,
  deleteProductImage
);
router.delete("/:_id", requireAuth, deleteProduct);

// Image Upload Route
router.patch("/upload/:_id", requireAuth, upload.single("file"), uploadImage);

module.exports = router;
