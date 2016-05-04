import express from 'express'
const router = express.Router()
import { Router } from '../app/Router'
import BasicAuth from '../app/security/BasicAuth'
import Website from '../app/controllers/Website'

router.get(Router.index, Website.index)
router.get(Router.authenticate, Website.login)


export default router
