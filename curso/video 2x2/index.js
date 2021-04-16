const express = require("express");
const app = express();
const port = 5000;
const jsxEngine = require("./template/jsxEngine");

app.engine("jsx", jsxEngine);
app.set("views", "./views");
app.set("view engine", "jsx")

app.get("/", (req, res) => {
  res.render("index", {
    nombre: "libardo jesús rengifo",
  });
});

app.listen(port, () => {
  console.log("Servidor iniciado en el puerto " + port);
});
