const express = require("express");
const router = express.Router();
const ProductsServices = require("../../services/product");
const productService = new ProductsServices();
const Joi = require("joi");
const {
  createProductSchema,
  updateProductShema,
  productIdShema,
  productTagSchema,
} = require("../../utils/schemas/products");

const validation = require("../../middlewares/validationHandler");

router.get("/", async (req, res) => {
  const { tags } = req.query;
  const products = await productService.getProducts({ tags });
  res.json({
    status: 200,
    data: products,
    error: null,
    message: "Listing all products",
  });
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  const products = await productService.getProduct({ productId });
  res.json({
    status: 200,
    data: products,
    error: null,
    message: `Showing the info of nro.${product} product`,
  });
});

router.post("/", validation(createProductSchema), async (req, res) => {
  const product = await productService.createProduct({ product: req.body });
  
  console.log(product);
  res.status(201).json({
    status: 201,
    data: product,
    error: null,
    message: "Creating the product",
  });
}); 

router.put(
  "/:productId",
  validation(Joi.object({ productId: productIdShema }), "params"),
  validation(updateProductShema),
  async (req, res) => {
    const { productId } = req.params;
    const productBody = req.body;
    const product = await productService.updateProduct({
      productId,
      productBody,
    });
    res.json({
      status: 200,
      data: product,
      error: null,
      message: `Updating the nro.${productId} product`,
    });
  }
);

router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await productService.deleteProduct({ productId });
  res.json({
    status: 200,
    data: product,
    error: null,
    message: `Deleting the nro.${productId} product`,
  });
});

module.exports = router;
