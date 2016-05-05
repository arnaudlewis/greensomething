import { Router } from '../Router'
import UserRepo from '../data/repositories/UserRepo'
import { User, UserCompanion } from '../models/User'

export default {

  signin(req, res) {
    let email = req.body.email
    let password = req.body.password

    const errorUrl = (message) => {
      return Router.withQueryString(
        Router.authenticate,
        {
          signin_error: message,
          "signin_email": email
        }
      )
    }

    if(!(email && password)) res.redirect(errorUrl("You must provide all informations to signin"))

    UserRepo.byCredentials(email)
      .then((user) => {
        user.validPassword(password)
          .then((isValid) => {
            if(isValid) {
              res.cookie('X-token', UserCompanion.crypt(user), { maxAge: 900000, httpOnly: false});
              res.redirect(Router.index)
            } else res.redirect(errorUrl("Invalid password"))
          })
          .catch((errMessage) => {
            res.redirect(errorUrl(errMessage))
          })
      })
    .catch((errMessage) => {
      res.redirect(errorUrl(errMessage))
    })
  },

  signup(req, res) {
    let email = req.body.email
    let password = req.body.password
    let firstname = req.body.firstname
    let lastname = req.body.lastname

    const errorUrl = (message) => {
      return Router.withQueryString(
        Router.authenticate,
        {
          signup_error: message,
          "signup_email": email,
          "signup_firstname": firstname,
          "signup_lastname": lastname
        }
      )
    }

    if(!(email && password && firstname && lastname)) res.redirect(errorUrl("You must provide all informations to signup"))

    UserRepo.checkEmailAvailable((email))
      .then(() => {
        UserCompanion.hashPassword(password)
          .then((hash) => {
            const u = new User(null, email, hash, firstname, lastname)
            UserRepo.insert(u)
            .then(() => {
              res.redirect(Router.index)
            })
            .catch((errMessage) => {
              res.redirect(errorUrl(errMessage))
            })
          })
          .catch(() => {
            res.redirect(errorUrl("Unable to create user"))
          })
      })
      .catch((errMessage) => {
        res.redirect(errorUrl(errMessage))
      })
  },

  logout(req, res) {
    const referer = req.headers.referer
    req.app.locals.ctx = null
    res.clearCookie('X-token')
    res.redirect(referer)
  }
}