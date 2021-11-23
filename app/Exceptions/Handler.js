"use strict";

const Raven = require('raven')

const Config = use('Config')

const BaseExceptionHandler = use("BaseExceptionHandler");

const Env = use("Env");

const Youch = use("youch");

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    if (error.name === "ValidatorException") {
      return response.status(error.status).send(erro.messages);
    }

    if (Env.get("NODE_ENV") === "development") {
      const youch = new Youch(error,request.request);
      const errorJSON = await youch.toJSON()
      return response.status(error.status).send(errorJSON)
    }
    console.log(error);

    return response.status(erros.status).send()
  }

  async report(error) {
    Raven.config(Config.get('services.sentry.dsn'))
    Raven.captureException(error)
  }
}

module.exports = ExceptionHandler;
