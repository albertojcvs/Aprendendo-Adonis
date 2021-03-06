"use strict";

const Project = use("App/Models/Project");

class ProjectController {
  async index({ params }) {
    const { page } = params.get();
    const projects = await Project.query().with("user").pagination(page);

    return projects;
  }

  async store({ request, response, auth }) {
    const data = request.only(["title", "description"]);

    const project = await Project.create({ ...data, user_id: auth.user_id });
  }

  async show({ params }) {
    const project = await Project.findOrFail(params.id);
    await project.load("user");
    await project.load("tasks");
    return project;
  }

  async update({ params, request }) {
    const project = await Project.findOrFail(params.id);
    const data = request.only(["title", "decription"]);
    project.merge(data);

    await project.save();

    return project;
  }

  async destroy({ params }) {
    const project = await Project.findOrFail(params.id);

    await project.delete();
  }
}

module.exports = ProjectController;
