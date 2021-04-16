function reqinfo(req, res, next) {
  console.log("-----Querys----");
  console.log(req.query);
  console.log("---------------");
  next();
}

module.exports = { reqinfo };
