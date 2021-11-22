"use strict";

const Task = use("App/Models/Task");

class TaskController {
  async index({ request, response, view }) {
    const tasks = await Task.query()
      .where("project_id", params.project_id)
      .with("project")
      .fettch();

    return tasks;
  }

  async store({ params, request }) {
    const data = request.only([
      "user_id",
      "title",
      "description",
      "due_date",
      "file_id",
    ]);

    const task = await Task.create({ ...data, project_id: params.projects_id });
    return task;
  }

  async show({ params }) {
    const task = await Task.findOrFail(params.id);

    return task;
  }

  async update({ params, request, response }) {
    const task = await Task.findOrFail(params.id);
    const data = request.only([
      "user_id",
      "title",
      "description",
      "due_date",
      "file_id",
    ]);

    task.merge(data);

    await task.save();
  }

  async destroy({ params, request, response }) {
    const task = await Task.findOrFail(params.id);

    task.destroy();
  }
}

module.exports = TaskController;
