'use strict'

const Antl = use('Antl')

class Session {
  get validatorAll(){
    return true
  }
  get rules () {
    return {
     email:'required|email',
     password:'required'
    }
  }
  get messages() {
    return Antl.list()
    }
}

module.exports = Session
