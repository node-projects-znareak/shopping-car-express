const express = require("express");
const router = express.Router();
const ProductsServices = require("../../services/product");
const productService = new ProductsServices();
const Joi = require("joi");
const passport = require("passport");
const {
  createProductSchema,
  updateProductShema,
  productIdShema,
} = require("../../utils/schemas/products");
const cacheResponse = require("../../utils/cacheResponse");
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require("../../utils/time");
const validation = require("../../middlewares/validationHandler");

require("../../utils/auth/strategies/jwt");


function productsApi(app) {
  app.use("/api/products", router);
  router.get("/", async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

    const { tags } = req.query;
    try {
      const products = await productService.getProducts({ tags });
      res.json({
        status: 200,
        data: products,
        error: null,
        message: "Listing all products",
      });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:productId", async (req, res, next) => {
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

    const { productId } = req.params;
    try {
      const products = await productService.getProduct({ productId });
      res.json({
        status: 200,
        data: products,
        error: null,
        message: `Showing the info of nro.${product} product`,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", validation(createProductSchema), async (req, res, next) => {
    try {
      const product = await productService.createProduct({ product: req.body });
      res.status(201).json({
        status: 201,
        data: product,
        error: null,
        message: "Creating the product",
      });
    } catch (error) {
      next(error);
    }
  });

  router.put(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    validation(Joi.object({ productId: productIdShema }), "params"),
    validation(updateProductShema),
    async (req, res, next) => {
      const { productId } = req.params;
      const productBody = req.body;
      try {
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
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const { productId } = req.params;
      try {
        const product = await productService.deleteProduct({ productId });
        res.json({
          status: 200,
          data: product,
          error: null,
          message: `Deleting the nro.${productId} product`,
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = productsApi;
