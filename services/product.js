const productsMock = require("../utils/mocks/products");
const MongoLib = require("../lib/mongo");

class ProductsServices {
  constructor() {
    this.collection = "products";
    this.mongoDb = new MongoLib();
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongoDb.getAll(this.collection, query);
    return products || [];
  }

  getProduct({ productId }) {
    return Promise.resolve(productsMock[productId]);
  }

  createProduct({ product }) {
    return Promise.resolve(productsMock[0]);
  }

  updateProduct({ productId, productBody }) {
    return Promise.resolve(productsMock[productId]);
  }

  deleteProduct({ productId }) {
    return Promise.resolve(productsMock[productId]);
  }
}

module.exports = ProductsServices;
