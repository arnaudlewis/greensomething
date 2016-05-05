import { Global } from '../global'
import * as BCrypt from 'bcrypt-nodejs'
import JWT from 'jsonwebtoken'
import R from 'ramda'
import {CustomDate, DateTypes} from '../helpers'

export let User = class {

  constructor (id, email, password, firstname, lastname) {
    this._id = id
    this.email = email
    this.password = password
    this.firstname = firstname
    this.lastname = lastname
  }

    validPassword (password) {
    return new Promise((resolve, reject) => {
      BCrypt.compare(password, this.password, function(err, res) {
        if(err) reject()
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

  asPublicCtx () {
    return {
      "_id": this._id,
      "email": this.email,
      "firstname": this.firstname,
      "lastname": this.lastname
    }
  }
}

export let UserCompanion = {

  hashPassword (password) {
    return new Promise((resolve, reject) => {
      BCrypt.genSalt(Global.BCryptSaltRounds, (err, salt) => {
        BCrypt.hash(password, salt, null, (err, hash) => {
          if(err) reject()
          resolve(hash)
        })
      })
    })
  },

  crypt(user) {
    const expirationDate = CustomDate.increment(CustomDate.now(), Global.TokenExpiration, DateTypes.DAY)
    const ctx = R.merge(user.asPublicCtx(), {expiredAt: expirationDate})
    return JWT.sign(ctx, Global.JWTPassphrase)
  },

  decrypt(token) {
    return JWT.verify(token, Global.JWTPassphrase);
  }
}
