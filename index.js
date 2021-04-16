const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
const morgan = require("morgan");
const { reqinfo } = require("./middlewares/reqinfo");
const productsRouter = require("./routers/views/products");
const productsApiRouter = require("./routers/api/productsApiRouter");
const config = require("./config");
const {
  logErrors,
  wrapErrors,
  clientErrorHandling,
  errorHandling,
} = require("./middlewares/errorsHandling");
const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi");
const boom = require("boom");

// engine views
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api/products", reqinfo);

// static frontend files
app.use("/static", express.static(path.join(__dirname, "./public")));

// api's routers
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.use((req, res, next) => {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload },
    } = boom.notFound();
    res.status(statusCode).json(payload);
  }

  res.status(404).render("404");
});

app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandling);
app.use(errorHandling);

// server starting
app.listen(config.port, () => {
  console.log("Servidor iniciado en el puerto " + port);
});
