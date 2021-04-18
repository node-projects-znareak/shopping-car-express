const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const debug = require("debug")("app:server");
const productsRouter = require("./routers/views/products");
const productsApiRouter = require("./routers/api/productsApiRouter");
const authApiRouter = require("./routers/api/authApiRouter")
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

// static frontend files
app.use("/static", express.static(path.join(__dirname, "./public")));

// api routers
app.use("/products", productsRouter);
productsApiRouter(app);
app.use("/api/auth", authApiRouter);

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
  debug(`Listening http://localhost:${config.port}`);
});
