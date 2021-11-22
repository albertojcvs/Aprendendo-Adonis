"use strict";

const crypton = require("crypto");
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
      console.log(err);
      response
        .status(err.status)
        .send({ error: { message: "Algo de errado aconteceu" } });
    }
  }
}

module.exports = ForgetPasswordController;
