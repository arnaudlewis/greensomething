import { Strategy } from 'passport-local'

import UserRepo from '../data/repositories/UserRepo'

export default {

  login (req, res) {
    const u = req.user
    const user = new User(u._id, u.email, u.email)
    res.redirect("/")
  }
}
