"use strict";

const Mail = use("Mail");
const Helpers = use('Helpers')

class NewTaskMail {
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return "NewTaskMail-job";
  }

  // This is where the work is done.
  async handle({ email, username, title, file }) {
    await Mail.send(
      ["new_task"],
      { username, title, hasAttachment: !!file },
      (message) => {
        message
          .to(email)
          .from("alberto.silva@luby.softaware", "Alberto | Luby")
          .subject("Nova tarefa para você!");
        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`)),
            {
              fileName: file.name,
            };
        }
      }
    );
  }
}

module.exports = NewTaskMail;
