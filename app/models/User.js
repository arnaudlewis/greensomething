'use strict';

export let User = class {

  constructor (id, email, username, password) {
    this.id = id
    this.email = email
    this.password = password
  }

  toJson () {
    return {
      "id": this.id,
      "email": this.email,
      "password": this.password
    }
  }
}

import UserRepo from '../data/repositories/UserRepo.js'

export let UserObject = {

  validateCredentials (email, password) {

  }
}
