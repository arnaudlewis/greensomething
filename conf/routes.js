import express from 'express'
const router = express.Router()
import { Router } from '../app/Router'
import Authentication from '../app/security/Authentication'
import Website from '../app/controllers/Website'
import { AppConfig } from './appconfig'


router.use((req, res, next) => {
  next();
});

router.get(Router.index, Website.index)
router.get(Router.authenticate, Website.authenticate)
router.post(Router.signin, Authentication.signin)
router.post(Router.signup, Authentication.signup)


export default router
