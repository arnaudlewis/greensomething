'use strict';
import { Global } from '../global'
import Bcrypt from 'bcrypt'

export let User = class {

  constructor (id, email, password, firstname, lastname) {
    this._id = id
    this.email = email
    this.password = password
    this.firstname = firstname
    this.lastname = lastname
  }

  fullname () {
    return this.firstname + ' ' + this.lastname
  }

  validPassword (password) {
    return new Promise((resolve, reject) => {
      Bcrypt.compare(password, this.password, function(err, res) {
        if(err) reject(err.message)
        resolve(res)
      })
    })
  }

  toJson () {
    return {
      "_id": this._id,
      "email": this.email,
      "password": this.password,
      "firstname": this.firstname,
      "lastname": this.lastname
    }
  }
}

export let UserCompanion = {

  hashPassword (password) {
    return new Promise((resolve, reject) => {
      Bcrypt.hash(password, Global.BCryptSaltRounds, (err, hash) => {
        if(err) reject()
        resolve(hash)
      });
    })
  }
}
