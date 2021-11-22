"use strict";
const moment = require("moment");
const crypton = require("crypto");
const { updateLocale } = require("moment");
const User = use("App/Models/User");
const Mail = use("Mail");

class ForgetPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      user.token = crypton.randomBytes(10).toString("hex");
      user.token_created_at = new Date();

      await user.save();

      await Mail.send(
        ["forgot_password"],
        {
          token: user.token,
          link: `${request.input("redirect_url")}?token=${user.token}`,
        },
        (message) => {
          message
            .to(user.email)
            .from("albertojcvs@teste.com")
            .subject("Recuperação de senha!");
        }
      );
    } catch (err) {
      response
        .status(err.status)
        .send({ error: { message: "Algo de errado aconteceu" } });
    }
  }
  async update({ request, response }) {
    try {
      const {token, password} = request.all();

      const user = await User.findByOrFail("token", token);

      const isTokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.token_created_at);

      if (isTokenExpired) {
        response
          .status(401)
          .send({ error: { message: "O token de recuperaçao está experido" } });
      }

      user.tokean = null
      user.token_created_at = null
      user.password = password;

      await user.save();

    } catch (err) {
      console.log(err);
      response
      .status(err.status)
      .send({ error: { message: "Algo de errado aconteceu ao tentar resetar a senha" } });
    }
  }
}

module.exports = ForgetPasswordController;
