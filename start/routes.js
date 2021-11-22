'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => {
})
Route.post('/users', 'UserController.store').validator('User')

Route.post('/sessions','SessionController.store').validator('Session')

Route.post('/password', 'ForgetPasswordController.store').validator('ForgotPassword');
Route.put('/password', 'ForgetPasswordController.update').validator('ResetPassword');

Route.get('/files/:id', 'FileController.show')


Route.group(() => {

  Route.post('/files', 'FileController.store')
  Route.resource('projects', 'ProjectController')
  .apiOnly()
  .validator(new Map([[['projects.store'],['Project']]]))
  Route.resource('projects.tasks', 'TaskController')
  .apiOnly()
  .validator(new Map([[['projects.tasks.store'],['Task']]]))
}).middleware(['auth'])
