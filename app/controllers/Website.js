import { Router } from '../Router'
import UserRepo from '../data/repositories/UserRepo'
import { User } from '../models/User'

export default {

  index(req,res){
    res.render('index')
  },

  authenticate(req, res) {
    res.render(
      'authenticate',
      {
        signup_email: req.query.signup_email,
        signup_firstname: req.query.signup_firstname,
        signup_lastname: req.query.signup_lastname,
        signin_email: req.query.signin_email,
        signin_error: req.query.signin_error,
        signup_error: req.query.signup_error
      }
    )
  },

  signin(req, res) {
    let email = req.body.email
    let password = req.body.password

    const errorUrl = Router.withQueryString(
      Router.authenticate,
      {
        signin_error: "You must provide all informations to signin",
        "signin_email": email
      }
    )

    if(!(email && password)) res.redirect(Router.withQueryString(Router.authenticate, {signin_error: "You must provide email and password"}))

    UserRepo.byCredential(email)
      .then((user) => {
        user.validPassword(password)
          .then((isValid) => {
            res.redirect(Router.index)
          })
          .catch((errMessage) => {
            res.redirect(Router.withQueryString(Router.authenticate, {signin_error : errMessage}))
          })
      })
    .catch((errMessage) => {
      res.redirect(Router.withQueryString(Router.authenticate, {signin_error : errMessage}))
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
        const u = new User(null, email, password, firstname, lastname)
        UserRepo.insert(u)
          .then(() => {
            res.redirect(Router.index)
          })
          .catch((errMessage) => {
            res.redirect(Router.withQueryString(errorUrl(errMessage)))
          })
      })
      .catch((errMessage) => {
        res.redirect(errorUrl(errMessage))
      })
  }
}
