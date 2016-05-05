'use strict';
/*import Bcrypt from 'bcrypt'*/

export let User = class {

  constructor (id, email, username, password, firstname, lastname) {
    this._id = id
    this.email = email
    this.password = password
    this.firstname = firstname
    this.lastname = lastname
  }

  validPassword (password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, function(err, res) {
        if(err) reject(err.message)
        else resolve(true)
      })
    })
  }

  toJson () {
    return {
      "_id": this.id,
      "email": this.email,
      "password": this.password,
      "firstname": this.firstname,
      "lastname": this.lastname
    }
  }
}
