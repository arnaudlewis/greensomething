import express from 'express'
import { Config } from './config'

const app = Config.app()
const db = Config.db()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
