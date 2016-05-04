import express from 'express'
const router = express.Router()

import BasicAuth from '..//app/security/BasicAuth'

router.get("/", BasicAuth.login)

export default router
