import express from 'express'
const router = express.Router()
import { Router } from '../app/Router'
import BasicAuth from '../app/security/BasicAuth'
import Website from '../app/controllers/Website'
import { AppConfig } from './appconfig'


router.use(function (req, res, next) {
  next();
});

router.get(Router.index, Website.index)
router.get(Router.authenticate, Website.authenticate)
router.post(Router.signin, Website.signin)
router.post(Router.signup, Website.signup)
router.get(Router.tripview, Website.tripview)
router.post(Router.travel, Website.trip)



export default router
