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

  profile(req, res) {
    res.render(
      'profile',
      {
        user: null
      }
    )
  }
}
