import express from 'express'
const router = express.Router()
import { Router } from '../app/Router'
import BasicAuth from '../app/security/BasicAuth'
import Website from '../app/controllers/Website'

router.post(Router.index, BasicAuth.login)
router.get(Router.authenticate, Website.login)

export default router
