const config = require("../config");
const { MongoClient } = require("mongodb");

const user = encodeURIComponent(config.dbUser);
const password = encodeURIComponent(config.dbPassword);

const MONGO_URI = `mongodb+srv://${user}:${password}@cluster0.oegdf.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = config.dbName;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((err) => {
        if (err) return reject(err);
        resolve(this.client.db(this.dbName));
        console.log("Connected successlly to remote mongodb");
      });
    });
  }

  async getAll(collection, query) {
    const db = await this.connect();
    return db.collection(collection).find(query).toArray();
  }
}

module.exports = MongoLib;
