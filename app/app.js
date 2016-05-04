import express from 'express'
import { AppConfig } from '../conf/appconfig'

const app = AppConfig()

app.listen(app.get('port'), () => console.log('Green something Up and Running on port ' + app.get('port')))
