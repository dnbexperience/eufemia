/**
 * Server
 *
 */

import express from 'express'
// import fetch from 'node-fetch'
import dotenv from 'dotenv'
import { fetchFigmaData } from '../scripts/figma'
import { runPrepublishTasks } from '../scripts/prepub'
// import { yalcPublish } from '../scripts/prepub/yalc'

dotenv.config()

const app = express()
const port = 3456

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', 'true')
  // res.header(
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type, Accept'
  // )
  next()
})

app.get('/figma/update', async (request, response) => {
  await fetchFigmaData({ doRefetch: true })
  await runPrepublishTasks({ preventDelete: true })
  console.log('> PrePublish: done!')
  response.send('{}')
})

app.get('/figma/update/local', async (request, response) => {
  await fetchFigmaData({ doRefetch: true })
  await runPrepublishTasks({ preventDelete: true })
  console.log('> PrePublish: done!')
  // await yalcPublish()
  response.send('{"result": "done"}')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
