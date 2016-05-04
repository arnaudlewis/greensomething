import passport from 'passport'
import { Strategy } from 'passport-local'

import UserRepo from '../data/repositories/UserRepo'

passport.use(new Strategy(
  (identifier, password, done) => {
    UserRepo.byCredentials(identifier)
      .then((user) => {
        if (!user) return done(null, false, { message: 'Incorrect credentials.' })
        if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' })
        return done(null, user)
      })
      .catch((err) => {
        return done(err)
      })
    }
))

export default {

  login (req, res) {
    console.log("authenticate")
  }
}
