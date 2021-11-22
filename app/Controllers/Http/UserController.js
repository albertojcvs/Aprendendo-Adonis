'use strict'
const User  = use('App/Models/User')

class UserController {
  async store({request}){

    const {username, email,password} =  request.only(['username', 'password', "email"])

    const user = await User.create({username,email,password})

    return user

  }
}

module.exports = UserController
