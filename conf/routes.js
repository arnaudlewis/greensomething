import express from 'express'
const router = express.Router()
import R from 'ramda'
import { Router } from '../app/Router'
import Authentication from '../app/security/Authentication'
import Website from '../app/controllers/Website'
import { AppConfig } from './appconfig'
import { UserCompanion } from '../app/models/User'


router.use((req, res, next) => {
  const token = req.cookies['X-token']
  if(!token) next()
  else {
    const userWithExpiration = UserCompanion.decrypt(token)
    const expirationTime = new Date(userWithExpiration.expiredAt).getTime()
    if(expirationTime < new Date().getTime()) {
      next()
    } else {
      const u = R.omit(['expiredAt'], userWithExpiration)
      req.ctx = u
      req.app.locals.ctx = u
      next()
    }
  }
});

//Website
router.get(Router.index, Website.index)
router.get(Router.authenticate, Website.authenticate)
router.get(Router.profile, Website.profile)
router.get(Router.tripview, Website.tripview)
router.post(Router.travel, Website.tripinsert)
router.get(Router.triplist, Website.getAllTrip)

// Security
router.post(Router.signin, Authentication.signin)
router.post(Router.signup, Authentication.signup)
router.get(Router.logout, Authentication.logout)

export default router
