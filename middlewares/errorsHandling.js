const config = require("../config/");
const boom = require("boom");
const Sentry = require("@sentry/node");
const isRequestAjaxOrApi = require("../utils/isRequestAjaxOrApi");

Sentry.init({
  dsn:
    "https://c5e65bfe77f549baaf03481ff6ee8d7f@o566799.ingest.sentry.io/5710054",
  tracesSampleRate: 1.0,
});

function withErrorStack(err, Stack) {
  if (config.dev) {
    return { ...err, Stack };
  }
}

function logErrors(err, req, res, next) {
  Sentry.captureException(err);
  console.log(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function clientErrorHandling(err, req, res, next) {
  const { statusCode, payload } = err.output;
  // catch errors ajax or errors while streaming
  if (isRequestAjaxOrApi(req) || req.headersSent) {
    return res.status(statusCode).json(withErrorStack(payload, err.stack));
  }
  next(err);
}

function errorHandling(err, req, res, next) {
  const { statusCode, payload } = err.output;
  res.status(statusCode);
  res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandling,
  errorHandling,
};
