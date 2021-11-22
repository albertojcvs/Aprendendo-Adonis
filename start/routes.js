'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => {
})
Route.post('/users', 'UserController.store')

Route.post('/sessions','SessionController.store');

Route.post('/password', 'ForgetPasswordController.store');
Route.put('/password', 'ForgetPasswordController.update');

Route.get('/files/:id', 'FileController.show')
Route.post('/files', 'FileController.store')
