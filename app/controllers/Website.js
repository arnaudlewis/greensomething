import { Router } from '../Router'

export default {

  login(req, res) {
    let email = req.body.email
    let password = req.body.password

    UserRepo.byCredentials(email)
      .then((user) => {

      })
    .catch(() => {
      res.redirect(Router.authenticate, {error : "Unavailable email"})
    })
    res.redirect(Router.index)
  }
}
