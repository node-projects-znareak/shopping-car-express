const config = require("../config/");
const boom = require("boom");
const isRequestAjaxOrApi = require("../utils/isRequestAjaxOrApi");

function withErrorStack(err, Stack) {
  if (config.dev) {
    return { ...err, Stack };
  }
}

function logErrors(err, req, res, next) {
  console.log(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  // err ya tiene un error tipo Boom
  next(err);
}

function clientErrorHandling(err, req, res, next) {
  // err es una instancia de Boom, por lo tanto se puede acceder a err.output
  const { statusCode, payload } = err.output;
  // catch errors ajax or errors while streaming
  if (isRequestAjaxOrApi(req) || req.headersSent) {
    return res.status(statusCode).json(withErrorStack(payload, err.stack));
  }

  // si no es una peticion fetch, entonces renderizamos una pagina de error
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
