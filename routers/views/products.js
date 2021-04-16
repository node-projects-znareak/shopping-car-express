const express = require("express");
const productsRouter = express.Router();
const ProductsServices = require("../../services/product");
const productInstace = new ProductsServices();

productsRouter.get("/", async (req, res, next) => {
  try {
    //throw new Error("this is a error xD");
    const { tags } = req.query;
    const products = await productInstace.getProducts({ tags });
    res.render("products", { products });
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
